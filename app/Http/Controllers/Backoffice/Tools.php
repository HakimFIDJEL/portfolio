<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Backoffice\Tool;
use App\Models\Backoffice\ToolItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class Tools extends Controller
{
    /**
     * Liste des catégories d'outils.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/tools/index', [
            'tools' => Tool::orderBy('sort_order', 'asc')->with('items')->get(),
        ]);
    }

    /**
     * Formulaire d'ajout d'une catégorie d'outils.
     */
    public function create(): Response
    {
        return Inertia::render('backoffice/tools/create');
    }

    /**
     * Persister une nouvelle catégorie d'outils et ses items.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'items' => ['sometimes', 'array'],
            'items.*.name' => ['required_with:items', 'string', 'max:255'],
            'items.*.sort_order' => ['required_with:items', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            $validated['sort_order'] = (int) (Tool::max('sort_order') ?? 0) + 1;

            /** @var Tool $tool */
            $tool = Tool::create($validated);

            foreach ($validated['items'] ?? [] as $itemData) {
                $itemData['tool_id'] = $tool->id;
                ToolItem::create($itemData);
            }
        });

        return redirect()->route('backoffice.tools.index')->with('success', 'Tool created successfully.');
    }

    /**
     * Formulaire d'édition d'une catégorie d'outils.
     */
    public function edit(Tool $tool): Response
    {
        return Inertia::render('backoffice/tools/edit', [
            'tool' => $tool->load('items'),
        ]);
    }

    /**
     * Mettre à jour une catégorie d'outils et synchroniser ses items.
     */
    public function update(Request $request, Tool $tool): RedirectResponse
    {
        $validated = $request->validate([
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'items' => ['sometimes', 'array'],
            'items.*.id' => ['sometimes', 'integer', 'exists:tool_items,id'],
            'items.*.name' => ['required_with:items', 'string', 'max:255'],
            'items.*.sort_order' => ['required_with:items', 'integer'],
        ]);

        DB::transaction(function () use ($validated, $tool): void {
            $tool->update($validated);

            $existingItemIds = $tool->items()->pluck('id')->all();
            $submittedItemIds = [];

            foreach ($validated['items'] ?? [] as $itemData) {
                if (isset($itemData['id']) && in_array($itemData['id'], $existingItemIds, true)) {
                    $item = ToolItem::find($itemData['id']);
                    $item?->update($itemData);
                    $submittedItemIds[] = (int) $itemData['id'];
                } else {
                    $itemData['tool_id'] = $tool->id;
                    $newItem = ToolItem::create($itemData);
                    $submittedItemIds[] = (int) $newItem->id;
                }
            }

            $itemsToDelete = array_diff($existingItemIds, $submittedItemIds);
            if (! empty($itemsToDelete)) {
                ToolItem::destroy($itemsToDelete);
            }
        });

        return redirect()->route('backoffice.tools.index')->with('success', 'Tool updated successfully.');
    }

    /**
     * Réordonner les catégories d'outils.
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tools' => ['required', 'array'],
            'tools.*.id' => ['required', 'integer', 'exists:tools,id'],
            'tools.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            foreach ($validated['tools'] as $index => $tool) {
                Tool::where('id', $tool['id'])->update(['sort_order' => $index + 9000]);
            }

            foreach ($validated['tools'] as $index => $tool) {
                Tool::where('id', $tool['id'])->update(['sort_order' => $index]);
            }
        });

        return redirect()->back()->with('success', 'Tools sorted successfully.');
    }

    /**
     * Supprimer une catégorie d'outils et ses items en cascade.
     */
    public function destroy(Tool $tool): RedirectResponse
    {
        DB::transaction(function () use ($tool): void {
            $tool->items()->delete();
            $tool->delete();
        });

        return redirect()->route('backoffice.tools.index')->with('success', 'Tool deleted successfully.');
    }
}
