<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\Password as RequestsPassword;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class Password extends Controller
{
    /**
     * Afficher le formulaire de modification de mot de passe utilisateur.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/password');
    }

    /**
     * Mettre à jour le mot de passe de l'utilisateur connecté.
     */
    public function update(RequestsPassword $request): RedirectResponse
    {
        $data = $request->validated();

        if (! Auth::validate(['id' => Auth::id(), 'password' => $data['current_password']])) {
            return redirect()->back()->withErrors([
                'current_password' => __('settings.flash.incorrect_current_password'),
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $user->update([
            'password' => $data['password'],
        ]);

        return redirect()->back()->with(['success' => __('settings.flash.password_updated')]);
    }
}
