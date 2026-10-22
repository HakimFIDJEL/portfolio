<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Backoffice\Education;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class Educations extends Controller
{
    /**
     * Liste des formations.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/educations/index', [
            'educations' => Education::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    /**
     * Formulaire d'ajout d'une formation.
     */
    public function create(): Response
    {
        return Inertia::render('backoffice/educations/create');
    }

    /**
     * Persister une nouvelle formation.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:255'],
            'type_fr' => ['required', 'string', 'max:255'],
            'type_en' => ['required', 'string', 'max:255'],
            'description_fr' => ['required', 'string'],
            'description_en' => ['required', 'string'],
        ]);

        $validated['sort_order'] = (int) (Education::max('sort_order') ?? 0) + 1;

        Education::create($validated);

        return redirect()->route('backoffice.educations.index')->with('success', 'Education created successfully.');
    }

    /**
     * Formulaire d'édition d'une formation.
     */
    public function edit(Education $education): Response
    {
        return Inertia::render('backoffice/educations/edit', [
            'education' => $education,
        ]);
    }

    /**
     * Mettre à jour une formation.
     */
    public function update(Request $request, Education $education): RedirectResponse
    {
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:255'],
            'type_fr' => ['required', 'string', 'max:255'],
            'type_en' => ['required', 'string', 'max:255'],
            'description_fr' => ['required', 'string'],
            'description_en' => ['required', 'string'],
        ]);

        $education->update($validated);

        return redirect()->route('backoffice.educations.index')->with('success', 'Education updated successfully.');
    }

    /**
     * Réordonner les formations.
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'educations' => ['required', 'array'],
            'educations.*.id' => ['required', 'integer', 'exists:educations,id'],
            'educations.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            foreach ($validated['educations'] as $index => $education) {
                Education::where('id', $education['id'])->update(['sort_order' => $index + 9000]);
            }

            foreach ($validated['educations'] as $index => $education) {
                Education::where('id', $education['id'])->update(['sort_order' => $index]);
            }
        });

        return redirect()->back()->with('success', 'Educations sorted successfully.');
    }

    /**
     * Supprimer une formation.
     */
    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return redirect()->route('backoffice.educations.index')->with('success', 'Education deleted successfully.');
    }
}
