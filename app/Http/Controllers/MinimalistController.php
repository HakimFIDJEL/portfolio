<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Project;
use App\Models\Social;
use App\Models\StackCategory;
use App\Models\ToolCategory;
use App\Models\User;


class MinimalistController extends Controller
{
    public function home() {
        return Inertia::render('minimalist/Home', 
        [
            'version'   => 'minimalist',
            'projects'  => Project::all(),
            'socials'   => Social::all(),
            'stackCategories'    => StackCategory::with('stacks')->get(),
            'toolCategories'     => ToolCategory::with('tools')->get(),
            'user'      => User::first(),
        ]);
    }

    public function project(string $slug, Project $project) {
        return Inertia::render('minimalist/Project', ['version' => 'minimalist', 'project' => $project]);
    }
    
}
