<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MinimalistController extends Controller
{
    public function home() {
        sleep(4);
        return Inertia::render('Home', ['name' => 'World']);
    }

    public function project(/* Project $project */) {
        //
    }
    
}
