<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Backoffice\Project;
use App\Models\Backoffice\StackItem;
use App\Models\Backoffice\Tag;

class Projects extends Controller
{
    public function index() {
        return Inertia::render('backoffice/projects/index', [
            'projects' => Project::orderBy('sort_order', 'asc')->with('items')->get(),
        ]);
    }

    public function create() {

        $tags = Tag::orderBy('sort_order', 'asc')->get();
        $stack_items = StackItem::orderBy('sort_order', 'asc')->get();

        return Inertia::render('backoffice/projects/create', [
            'tags' => $tags,
            'stack_items' => $stack_items,
        ]);
    }

    public function store(Request $request) {
        dd($request->all());

        return redirect()->route('backoffice.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project) {
        return Inertia::render('backoffice/projects/edit', [
            'project' => $project->load('items'),
        ]);
    }

    public function update(Request $request, Project $project) {
        dd($request->all());

        return redirect()->route('backoffice.projects.index')->with('success', 'Project updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'projects' => 'required|array',
            'projects.*.id' => 'required|integer|exists:projects,id',
            'projects.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['projects'] as $index => $project) {
            Project::where('id', $project['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['projects'] as $index => $project) {
            Project::where('id', $project['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Projects sorted successfully.');
    }

    public function destroy(Project $project) {
        $project->delete();
        return redirect()->route('backoffice.projects.index')->with('success', 'Project deleted successfully.');
    }
}
