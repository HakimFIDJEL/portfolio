<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
    public function index()
    {
        return Inertia::render('admin/projects/Index', [
            'projects' => Project::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/Create', [
            'stackCategories' => StackCategory::with('stacks')->get(),
        ]);
    }

    public function edit(Project $project)
    {
        $projectImages = $project->images->map(function ($image) {
            $fileUrl = Storage::url($image->url);
    
            return [
                'label' => $image->caption,
                'file' => $fileUrl,
            ];
        });

        // A continuer


        return Inertia::render('admin/projects/Edit', [
            'project' => $project::with('timeline', 'stacks')->find($project->id),
            'projectImages' => $projectImages,
            'stackCategories' => StackCategory::with('stacks')->get(),
        ]);
    }

    public function store(ProjectRequest $request)
    {

        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['title']);

        if (Project::where('slug', $validated['slug'])->exists()) {
            return redirect()->back()->withErrors(['title' => 'The title already exists']);
        }

        $project = Project::create($validated);

        $timeline = $request->timeline;
        if (!empty($timeline)) {
            $project->timeline()->createMany($timeline);
        }

        $stacks = $request->stacks;
        if (!empty($stacks)) {
            $project->stacks()->attach($stacks);
        }

        $images = $request->images;
        foreach ($images as $image) {
            $file = $image['file'];
            $path = Str::random(20) . '.' . $file->getClientOriginalExtension();

            $path = Storage::putFileAs('public/projects', $file, $path);

            $project->images()->create([
                'url' => $path,
                'caption' => $image['label'] ?? null,
                'size' => $file->getSize(),
                'type' => $file->getMimeType(),
                'extension' => $file->getClientOriginalExtension(),
                'mime_type' => $file->getMimeType(),
            ]);
        }

        return redirect()->route('admin.projects.index')->with(['success' => 'Project created successfully']);
    }

    public function update(Project $project, ProjectRequest $request)
    {
        dd('update', $request->all());

        $validated = $request->validated();

        $project->update($validated);

        return redirect()
            ->route('admin.project.index')
            ->with(['success' => 'Project updated successfully']);
    }

    public function delete(Project $project)
    {
        $images = $project->images;
        foreach ($images as $image) {
            Storage::delete($image->url);
            $image->delete();
        }

        $timelines = $project->timeline;
        foreach ($timelines as $timeline) {
            $timeline->delete();
        }

        $stacks = $project->stacks;
        foreach ($stacks as $stack) {
            $project->stacks()->detach($stack->id);
        }


        $project->delete();
        return redirect()
            ->route('admin.projects.index')
            ->with(['success' => 'Project deleted successfully']);
    }
}
