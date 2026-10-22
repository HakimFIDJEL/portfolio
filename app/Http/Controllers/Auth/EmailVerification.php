<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Email as RequestsEmail;
use App\Jobs\SendEmailJob;
use App\Mail\Auth\VerifyEmail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerification extends Controller
{
    /**
     * Afficher l'écran de notification de vérification d'email.
     */
    public function notice(): RedirectResponse|Response
    {
        /** @var User|null $user */
        $user = Auth::user();

        if ($user && $user->hasVerifiedEmail()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/verify-email');
    }

    /**
     * Envoyer un nouvel email de vérification avec token sécurisé.
     */
    public function sendVerificationEmail(): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();

        if ($user->email_verified_at !== null) {
            return redirect()->route('dashboard');
        }

        $token = Str::random(32);
        $user->update(['verification_token' => $token]);

        SendEmailJob::dispatch(new VerifyEmail($user, $token));

        return redirect()->route('auth.verification.notice')->with([
            'success' => __('auth.flash.verification.link_sent'),
        ]);
    }

    /**
     * Vérifier l'adresse email de l'utilisateur à partir du token.
     */
    public function verify(string $token): RedirectResponse|Response
    {
        /** @var User|null $user */
        $user = User::where('verification_token', $token)->first();

        if (! $user) {
            return redirect()->route('auth.verification.notice')->withErrors([
                'verification' => __('auth.flash.verification.invalid_token'),
            ]);
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->route('dashboard');
        }

        $user->markEmailAsVerified();

        return Inertia::render('auth/email-verified');
    }

    /**
     * Afficher la page de modification d'adresse email.
     */
    public function editEmail(): RedirectResponse|Response
    {
        /** @var User $user */
        $user = Auth::user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->route('settings.profile.edit');
        }

        return Inertia::render('auth/change-email');
    }

    /**
     * Mettre à jour l'adresse email de l'utilisateur non vérifié.
     */
    public function updateEmail(RequestsEmail $request): RedirectResponse
    {
        $data = $request->validated();
        /** @var User $user */
        $user = Auth::user();

        if (! Auth::validate(['id' => Auth::id(), 'password' => $data['password']])) {
            return redirect()->back()->withErrors([
                'password' => __('profile.flash.incorrect_current_password'),
            ]);
        }

        $emailChanged = array_key_exists('email', $data) && $data['email'] !== $user->email;

        if (! $emailChanged) {
            return redirect()->back()->withErrors([
                'email' => __('auth.flash.email.no_change'),
            ]);
        }

        $user->update([
            'email' => $data['email'],
            'email_verified_at' => null,
        ]);

        return redirect()->route('auth.verification.notice')->with([
            'success' => __('auth.flash.email.change'),
        ]);
    }
}
