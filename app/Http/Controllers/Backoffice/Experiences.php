<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Backoffice\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class Experiences extends Controller
{
    /**
     * Liste des expériences professionnelles.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/experiences/index', [
            'experiences' => Experience::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    /**
     * Formulaire d'ajout d'une expérience.
     */
    public function create(): Response
    {
        return Inertia::render('backoffice/experiences/create');
    }

    /**
     * Persister une nouvelle expérience.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'job_fr' => ['required', 'string', 'max:255'],
            'job_en' => ['required', 'string', 'max:255'],
            'status_fr' => ['required', 'string', 'max:255'],
            'status_en' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:255'],
            'description_fr' => ['required', 'string'],
            'description_en' => ['required', 'string'],
        ]);

        $validated['sort_order'] = (int) (Experience::max('sort_order') ?? 0) + 1;

        Experience::create($validated);

        return redirect()->route('backoffice.experiences.index')->with('success', 'Experience created successfully.');
    }

    /**
     * Formulaire d'édition d'une expérience.
     */
    public function edit(Experience $experience): Response
    {
        return Inertia::render('backoffice/experiences/edit', [
            'experience' => $experience,
        ]);
    }

    /**
     * Mettre à jour une expérience.
     */
    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'job_fr' => ['required', 'string', 'max:255'],
            'job_en' => ['required', 'string', 'max:255'],
            'status_fr' => ['required', 'string', 'max:255'],
            'status_en' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:255'],
            'description_fr' => ['required', 'string'],
            'description_en' => ['required', 'string'],
        ]);

        $experience->update($validated);

        return redirect()->route('backoffice.experiences.index')->with('success', 'Experience updated successfully.');
    }

    /**
     * Réordonner les expériences.
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'experiences' => ['required', 'array'],
            'experiences.*.id' => ['required', 'integer', 'exists:experiences,id'],
            'experiences.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            foreach ($validated['experiences'] as $index => $experience) {
                Experience::where('id', $experience['id'])->update(['sort_order' => $index + 9000]);
            }

            foreach ($validated['experiences'] as $index => $experience) {
                Experience::where('id', $experience['id'])->update(['sort_order' => $index]);
            }
        });

        return redirect()->back()->with('success', 'Experiences sorted successfully.');
    }

    /**
     * Supprimer une expérience.
     */
    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return redirect()->route('backoffice.experiences.index')->with('success', 'Experience deleted successfully.');
    }
}
