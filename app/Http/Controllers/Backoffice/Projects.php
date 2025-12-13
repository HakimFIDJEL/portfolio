<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Backoffice\Project;

class Projects extends Controller
{
    public function index() {
        return Inertia::render('backoffice/projects/index', [
            'projects' => Project::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
