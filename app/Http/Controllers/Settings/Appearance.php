<?php

// app/Http/Controllers/Settings/Appearance.php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

// Requests
use App\Http\Requests\Settings\Theme as RequestsTheme;
use App\Http\Requests\Settings\ColorScheme as RequestsColorScheme;

class Appearance extends Controller
{
    /**
     * Show the user's appearance settings page.
     */
    public function edit(): Response
    {
        $themes = config('preferences.themes');

        return Inertia::render('settings/appearance', [
            'themes' => $themes,
        ]);
    }

}
