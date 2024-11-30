<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\ProjectTimeline;
use App\Models\Stack;
use App\Models\StackCategory;

// Request
use App\Http\Requests\projects\ProjectRequest;

class ProjectController extends Controller
{
    public function index() {
        return Inertia::render('admin/projects/Index', [
            'projects' => Project::all()
        ]);
    }

    public function create() {
        return Inertia::render('admin/projects/Create', [
            'stackCategories' => StackCategory::with('stacks')->get()
        ]);
    }

    public function edit(Project $project) {
        return Inertia::render('admin/projects/Edit', [
            'project' => $project
        ]);
    }

    public function store(ProjectRequest $request) {

        dd("store", $request->all());

        $validated = $request->validated();

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with(['success' => 'Project created successfully']);
    }

    public function update(Project $project, ProjectRequest $request) {

        dd("update", $request->all());

        $validated = $request->validated();

        $project->update($validated);

        return redirect()->route('admin.project.index')->with(['success' => 'Project updated successfully']);
    }

    public function delete(Project $project) {
        $project->delete();
        return redirect()->route('admin.projects.index')->with(['success' => 'Project deleted successfully']);
    }
}
