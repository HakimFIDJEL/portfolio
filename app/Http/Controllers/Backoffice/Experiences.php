<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use app\Models\Backoffice\Experience;

class Experiences extends Controller
{
    public function index() {
        return Inertia::render('backoffice/experiences/index', [
            'experiences' => Experience::orderBy('sort_order', 'asc')->get()
        ]);
    }

    public function create() {
        return Inertia::render('backoffice/experiences/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'job_fr' => 'required|string|max:255',
            'job_en' => 'required|string|max:255',
            'status_fr' => 'required|string|max:255',
            'status_en' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description_fr' => 'required|string',
            'description_en' => 'required|string',
        ]);

        $validated['sort_order'] = Experience::max('sort_order') + 1;

        Experience::create($validated);

        return redirect()->route('backoffice.experiences.index')->with('success', 'Experience created successfully.');
    }

    public function edit(Experience $experience) {
        return Inertia::render('backoffice/experiences/edit', [
            'experience' => $experience
        ]);
    }

    public function update(Request $request, Experience $experience) {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'job_fr' => 'required|string|max:255',
            'job_en' => 'required|string|max:255',
            'status_fr' => 'required|string|max:255',
            'status_en' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'description_fr' => 'required|string',
            'description_en' => 'required|string',
        ]);

        $experience->update($validated);

        return redirect()->route('backoffice.experiences.index')->with('success', 'Experience updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'experiences' => 'required|array',
            'experiences.*.id' => 'required|integer|exists:experiences,id',
            'experiences.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['experiences'] as $index => $experience) {
            Experience::where('id', $experience['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['experiences'] as $index => $experience) {
            Experience::where('id', $experience['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Experiences sorted successfully.');
    }

    public function destroy(Experience $experience) {
        $experience->delete();
        return redirect()->route('backoffice.experiences.index')->with('success', 'Experience deleted successfully.');
    }

}
