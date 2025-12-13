<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Backoffice\Experience;

class Experiences extends Controller
{
    public function index() {
        return Inertia::render('backoffice/experiences/index', [
            'experiences' => Experience::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
