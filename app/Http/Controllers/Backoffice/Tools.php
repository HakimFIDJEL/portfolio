<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Backoffice\Tool;
use App\Models\Backoffice\ToolItem;

class Tools extends Controller
{
    public function index() {
        return Inertia::render('backoffice/tools/index', [
            'tools' => Tool::orderBy('sort_order', 'asc')->with('items')->get(),
        ]);
    }

    public function create() {
        return Inertia::render('backoffice/tools/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);

        $validated['sort_order'] = Tool::max('sort_order') + 1;

        Tool::create($validated);

        return redirect()->route('backoffice.tools.index')->with('success', 'Tool created successfully.');
    }

    public function edit(Tool $tool) {
        return Inertia::render('backoffice/tools/edit', [
            'tool' => $tool
        ]);
    }

    public function update(Request $request, Tool $tool) {
        $validated = $request->validate([
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);

        $tool->update($validated);
        return redirect()->route('backoffice.tools.index')->with('success', 'Tool updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'tools' => 'required|array',
            'tools.*.id' => 'required|integer|exists:tools,id',
            'tools.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['tools'] as $index => $tool) {
            Tool::where('id', $tool['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['tools'] as $index => $tool) {
            Tool::where('id', $tool['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Tools sorted successfully.');
    }

    public function destroy(Tool $tool) {
        $tool->delete();
        return redirect()->route('backoffice.tools.index')->with('success', 'Tool deleted successfully.');
    }
}
