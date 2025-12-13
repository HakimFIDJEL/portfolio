<?php

// app/Http/Controllers/Landing.php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

// Models
use App\Models\Backoffice\Contact;
use App\Models\Backoffice\Experience;

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

        $contacts = Contact::orderBy('sort_order', 'asc')->get();
        $experiences = Experience::orderBy('sort_order', 'asc')->get();

        return Inertia::render('landing', [
            'contacts' => $contacts,
            'experiences' => $experiences
        ]);
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
