<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Backoffice\Education;

class Educations extends Controller
{
    public function index() {
        return Inertia::render('backoffice/educations/index', [
            'educations' => Education::orderBy('sort_order', 'asc')->get()
        ]);
    }

    public function create() {
        return Inertia::render('backoffice/educations/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'type_fr' => 'required|string|max:255',
            'type_en' => 'required|string|max:255',
            'description_fr' => 'required|string',
            'description_en' => 'required|string',
        ]);

        $validated['sort_order'] = Education::max('sort_order') + 1;

        Education::create($validated);

        return redirect()->route('backoffice.educations.index')->with('success', 'Education created successfully.');
    }

    public function edit(Education $education) {
        return Inertia::render('backoffice/educations/edit', [
            'education' => $education
        ]);
    }

    public function update(Request $request, Education $education) {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'type_fr' => 'required|string|max:255',
            'type_en' => 'required|string|max:255',
            'description_fr' => 'required|string',
            'description_en' => 'required|string',
        ]);

        $education->update($validated);
        return redirect()->route('backoffice.educations.index')->with('success', 'Education updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'educations' => 'required|array',
            'educations.*.id' => 'required|integer|exists:educations,id',
            'educations.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['educations'] as $index => $education) {
            Education::where('id', $education['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['educations'] as $index => $education) {
            Education::where('id', $education['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Educations sorted successfully.');
    }

    public function destroy(Education $education) {
        $education->delete();
        return redirect()->route('backoffice.educations.index')->with('success', 'Education deleted successfully.');
    }
}
