<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MinimalistController extends Controller
{
    public function home() {
        return Inertia::render('minimalist/Home');
        // return Inertia::render('Home', ['name' => 'World']);
    }

    public function project(/* Project $project */) {
        //
    }
    
}
