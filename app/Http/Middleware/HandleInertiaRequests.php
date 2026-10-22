<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * Modèle racine chargé lors de la première requête.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Détermine la version courante des assets.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Données partagées par défaut avec toutes les pages Inertia.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user()?->load(['avatar', 'resume']);

        $locale = (string) Session::get('locale', App::getLocale());
        $fallbackLocale = (string) config('app.fallback_locale', 'en');

        // Récupération de l'utilisateur public avec mise en cache applicative
        $publicUser = Cache::remember('public_user_profile', 3600, function (): ?User {
            return User::with(['avatar', 'resume'])->first();
        });

        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'resume' => $user->resume,
                ] : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'old' => fn () => session()->getOldInput(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'errors' => fn () => $request->session()->get('errors')
                ? $request->session()->get('errors')->getBag('default')->getMessages()
                : (object) [],

            'locale' => $locale,
            'fallback_locale' => $fallbackLocale,

            'translations' => fn () => Cache::remember('translations_'.$locale, 3600, function () use ($locale): array {
                $path = lang_path($locale);
                if (! File::isDirectory($path)) {
                    return [];
                }

                return collect(File::files($path))
                    ->mapWithKeys(function ($file) use ($locale) {
                        $name = pathinfo((string) $file, PATHINFO_FILENAME);
                        $lines = Lang::get($name, [], $locale);

                        return [$name => Arr::undot(is_array($lines) ? $lines : [])];
                    })
                    ->toArray();
            }),

            'translations_fallback' => fn () => Cache::remember('translations_fallback_'.$fallbackLocale, 3600, function () use ($fallbackLocale): array {
                $path = lang_path($fallbackLocale);
                if (! File::isDirectory($path)) {
                    return [];
                }

                return collect(File::files($path))
                    ->mapWithKeys(function ($file) use ($fallbackLocale) {
                        $name = pathinfo((string) $file, PATHINFO_FILENAME);
                        $lines = Lang::get($name, [], $fallbackLocale);

                        return [$name => Arr::undot(is_array($lines) ? $lines : [])];
                    })
                    ->toArray();
            }),

            'timezone' => date_default_timezone_get(),

            'avatar_url' => $publicUser?->avatar?->url,
            'resume_url' => $publicUser?->resume?->url,
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ]);
    }
}
