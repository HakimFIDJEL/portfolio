<?php

// app/Http/Controllers/Landing.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

/**
 * Landing Page Controller
 * 
 * Handles requests related to the landing page.
 * 
 * @package App\Http\Controllers
 */
class Landing extends Controller
{
    /**
     * 
     */
    public function landing() {
        return Inertia::render('landing');
    }

    public function project(string $slug) {

        // TODO : Fetch project by slug and pass data to the view

        return Inertia::render('project', ['project' => null]);
    }

    public function toggle_language() {
        $newLocale = App::getLocale() === 'en' ? 'fr' : 'en';

        Session::put('locale', $newLocale);
        App::setLocale($newLocale);

        return redirect()->back();
    }

}
