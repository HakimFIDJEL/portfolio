<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Backoffice\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class Tags extends Controller
{
    /**
     * Liste des étiquettes / tags.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/tags/index', [
            'tags' => Tag::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    /**
     * Formulaire de création d'un tag.
     */
    public function create(): Response
    {
        return Inertia::render('backoffice/tags/create');
    }

    /**
     * Persister un nouveau tag.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
        ]);

        $validated['sort_order'] = (int) (Tag::max('sort_order') ?? 0) + 1;

        Tag::create($validated);

        return redirect()->route('backoffice.tags.index')->with('success', 'Tag created successfully.');
    }

    /**
     * Formulaire d'édition d'un tag.
     */
    public function edit(Tag $tag): Response
    {
        return Inertia::render('backoffice/tags/edit', [
            'tag' => $tag,
        ]);
    }

    /**
     * Mettre à jour un tag.
     */
    public function update(Request $request, Tag $tag): RedirectResponse
    {
        $validated = $request->validate([
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
        ]);

        $tag->update($validated);

        return redirect()->route('backoffice.tags.index')->with('success', 'Tag updated successfully.');
    }

    /**
     * Réordonner les tags.
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tags' => ['required', 'array'],
            'tags.*.id' => ['required', 'integer', 'exists:tags,id'],
            'tags.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            foreach ($validated['tags'] as $index => $tag) {
                Tag::where('id', $tag['id'])->update(['sort_order' => $index + 9000]);
            }

            foreach ($validated['tags'] as $index => $tag) {
                Tag::where('id', $tag['id'])->update(['sort_order' => $index]);
            }
        });

        return redirect()->back()->with('success', 'Tags sorted successfully.');
    }

    /**
     * Supprimer un tag.
     */
    public function destroy(Tag $tag): RedirectResponse
    {
        $tag->delete();

        return redirect()->route('backoffice.tags.index')->with('success', 'Tag deleted successfully.');
    }
}
