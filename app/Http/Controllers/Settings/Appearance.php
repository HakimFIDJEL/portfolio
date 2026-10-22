<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class Appearance extends Controller
{
    /**
     * Afficher les paramètres d'apparence de l'utilisateur.
     */
    public function edit(): Response
    {
        $themes = config('preferences.themes');

        return Inertia::render('settings/appearance', [
            'themes' => $themes,
        ]);
    }
}
