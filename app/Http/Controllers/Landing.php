<?php

// app/Http/Controllers/Landing.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('project');
    }
}
