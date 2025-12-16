<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use app\Models\Backoffice\Tag;

class Tags extends Controller
{
    public function index() {
        return Inertia::render('backoffice/tags/index', [
            'tags' => Tag::orderBy('sort_order', 'asc')->get()
        ]);
    }

    public function create() {
        return Inertia::render('backoffice/tags/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);

        $validated['sort_order'] = Tag::max('sort_order') + 1;

        Tag::create($validated);

        return redirect()->route('backoffice.tags.index')->with('success', 'Tag created successfully.');
    }

    public function edit(Tag $tag) {
        return Inertia::render('backoffice/tags/edit', [
            'tag' => $tag
        ]);
    }

    public function update(Request $request, Tag $tag) {
        $validated = $request->validate([
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);

        $tag->update($validated);
        return redirect()->route('backoffice.tags.index')->with('success', 'Tag updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'tags' => 'required|array',
            'tags.*.id' => 'required|integer|exists:tags,id',
            'tags.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['tags'] as $index => $tag) {
            Tag::where('id', $tag['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['tags'] as $index => $tag) {
            Tag::where('id', $tag['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Tags sorted successfully.');
    }

    public function destroy(Tag $tag) {
        $tag->delete();
        return redirect()->route('backoffice.tags.index')->with('success', 'Tag deleted successfully.');
    }
}
