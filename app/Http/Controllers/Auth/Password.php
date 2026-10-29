<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPassword as RequestsResetPassword;
use App\Http\Requests\Auth\SendResetLinkEmail as RequestsSendResetLinkEmail;
use App\Jobs\SendEmailJob;
use App\Mail\Auth\PasswordResetMail;
use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class Password extends Controller
{
    /**
     * Afficher la page de demande de réinitialisation de mot de passe.
     */
    public function forget(): Response
    {
        return Inertia::render('auth/forgot-password');
    }

    /**
     * Traiter la demande et expédier le lien de réinitialisation par email.
     */
    public function sendResetLinkEmail(RequestsSendResetLinkEmail $request): RedirectResponse
    {
        $data = $request->validated();

        $plainToken = Str::random(64);
        $hashedToken = hash('sha256', $plainToken);

        $user = User::where('email', $data['email'])->first();

        if ($user) {
            $user->passwordResetToken()->updateOrCreate(
                ['email' => $user->email],
                ['token' => $hashedToken, 'created_at' => now()]
            );

            SendEmailJob::dispatch(new PasswordResetMail($user, $plainToken));
        }

        return redirect()->back()->with(['success' => __('auth.flash.password.reset_link_sent')]);
    }

    /**
     * Afficher le formulaire de réinitialisation après vérification du token.
     */
    public function reset(string $token): RedirectResponse|Response
    {
        $record = PasswordResetToken::get()->first(function ($r) use ($token): bool {
            return hash_equals($r->token, hash('sha256', $token));
        });

        if (! $record) {
            return redirect()->route('auth.password.request')->with([
                'error' => [
                    'title' => __('common.flash.error'),
                    'description' => __('auth.flash.password.token_missing'),
                ],
            ]);
        }

        $user = $record->user;
        if (! $user) {
            return redirect()->route('auth.password.request')->with([
                'error' => [
                    'title' => __('common.flash.error'),
                    'description' => __('auth.flash.password.user_not_found'),
                ],
            ]);
        }

        return Inertia::render('auth/reset-password', [
            'email' => $user->email,
            'token' => $token,
        ]);
    }

    /**
     * Mettre à jour le mot de passe et invalider le token utilisé.
     */
    public function update(RequestsResetPassword $request): RedirectResponse
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();
        if (! $user) {
            return back()->with(['error' => ['title' => __('common.flash.error'), 'description' => __('auth.flash.password.user_not_found')]]);
        }

        $record = $user->passwordResetToken()->first();
        if (! $record) {
            return back()->with(['error' => ['title' => __('common.flash.error'), 'description' => __('auth.flash.password.token_missing')]]);
        }

        if ($record->created_at && $record->created_at->lt(now()->subMinutes(60))) {
            $record->delete();

            return back()->with(['error' => ['title' => __('common.flash.error'), 'description' => __('auth.flash.password.token_expired')]]);
        }

        if (! hash_equals($record->token, hash('sha256', $data['token']))) {
            return back()->with(['error' => ['title' => __('common.flash.error'), 'description' => __('auth.flash.password.token_mismatch')]]);
        }

        $user->update([
            'password' => Hash::make($data['password']),
            'remember_token' => Str::random(60),
        ]);

        $record->delete();

        return redirect()->route('auth.login')->with(['success' => __('auth.flash.password.reset_success')]);
    }
}
