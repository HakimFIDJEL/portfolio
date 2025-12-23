<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->trustProxies(at: '*');

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            SetLocale::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function ($response, Throwable $exception, Request $request) {
            // Vérifie si c'est une exception HTTP (y compris 404, 403, 401, 503, etc.)
            if ($exception instanceof ValidationException) {
                return $response; 
            }

            if($exception instanceof AuthenticationException) {
                return $response; 
            }

            $translations = fn () => collect(File::files(lang_path(Session::get('locale', App::getLocale()))))
                ->mapWithKeys(function ($file) {
                    $name = pathinfo($file, PATHINFO_FILENAME);
                    $lines = Lang::get($name);

                    return [$name => Arr::undot($lines)];
                })
                ->toArray();

            $user = $request->user()?->load([
                'avatar',
                'resume',
            ]);

            $auth = [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'resume' => $user->resume,
                ] : null,
            ];

            if ($exception instanceof HttpExceptionInterface) {
                $statusCode = $exception->getStatusCode();

                // Retourne une page d'erreur Inertia pour les codes > 400
                if ($statusCode >= 400) {
                    return Inertia::render('errors/show', [
                        'statusCode' => $statusCode,
                        'title' => $exception->getMessage() ?? '',
                        'translations' => $translations,
                        'auth' => $auth,
                        
                    ])->toResponse($request)
                        ->setStatusCode($statusCode);
                }
            }

            // Intercepte les exceptions d'autorisation qui ne sont pas des HttpExceptionInterface
            if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
                return Inertia::render('errors/show', [
                    'statusCode' => 403,
                    'title' => $exception->getMessage() ?: 'Forbidden',
                    'translations' => $translations,
                    'auth' => $auth,
                ])->toResponse($request)
                    ->setStatusCode(403);
            }

            // Pour toutes les autres exceptions (ex: erreurs 500 non HTTP, si APP_DEBUG est false)
            if (! ($response instanceof Response)) {
                $statusCode = 500;

                return Inertia::render('errors/show', [
                    'statusCode' => $statusCode,
                    'title' => 'Server Error',
                    'translations' => $translations,
                    'auth' => $auth,
                ])->toResponse($request)
                    ->setStatusCode($statusCode);
            }

            return $response;
        });
    })->create();
