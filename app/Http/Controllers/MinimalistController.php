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
            'projects'  => Project::where('online', '1')->orderBy('created_at', 'desc')->get(),
            'socials'   => Social::all(),
            'stackCategories'    => StackCategory::with('stacks')->get(),
            'toolCategories'     => ToolCategory::with('tools')->get(),
            'user'      => User::first(),
        ]);
    }

    public function project(string $slug, Project $project) {

        if($project->online == 0) {
            return redirect()->route('home');
        }

        return Inertia::render('minimalist/Project', [
            'version' => 'minimalist', 
            'project' => $project->load('stacks', 'images', 'timeline'),
        ]);
    }
    
}
