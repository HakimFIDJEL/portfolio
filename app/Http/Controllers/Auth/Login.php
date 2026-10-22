<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Login as RequestsLogin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class Login extends Controller
{
    /**
     * Afficher le formulaire de connexion.
     */
    public function create(): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => true,
        ]);
    }

    /**
     * Authentifier l'utilisateur avec protection par rate limiter.
     */
    public function store(RequestsLogin $request): RedirectResponse
    {
        $data = $request->validated();

        $key = hash('sha256', 'login'.implode('|', [$data['email'], (string) $request->ip()]));
        if (RateLimiter::tooManyAttempts($key, 5)) {
            abort(429);
        }
        RateLimiter::hit($key, 60);

        $credentials = [
            'email' => $data['email'],
            'password' => $data['password'],
        ];

        if (! Auth::attempt($credentials, (bool) ($data['remember'] ?? false))) {
            return redirect()->back()
                ->withInput($request->only('email', 'remember'))
                ->with(['error' => [
                    'title' => __('common.flash.error'),
                    'description' => __('auth.flash.login.invalid_credentials'),
                ]]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false))
            ->with(['success' => __('auth.flash.login.success')]);
    }

    /**
     * Déconnecter l'utilisateur de l'application et invalider la session.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login')->with([
            'success' => __('auth.flash.logout.success'),
        ]);
    }
}
