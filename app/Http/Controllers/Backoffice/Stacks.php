<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\StackItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class Stacks extends Controller
{
    /**
     * Liste des catégories de stacks techniques.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/stacks/index', [
            'stacks' => Stack::orderBy('sort_order', 'asc')->with('items')->get(),
        ]);
    }

    /**
     * Formulaire de création d'une stack.
     */
    public function create(): Response
    {
        return Inertia::render('backoffice/stacks/create');
    }

    /**
     * Persister une nouvelle stack et ses technologies.
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
            $validated['sort_order'] = (int) (Stack::max('sort_order') ?? 0) + 1;

            /** @var Stack $stack */
            $stack = Stack::create($validated);

            foreach ($validated['items'] ?? [] as $itemData) {
                $itemData['stack_id'] = $stack->id;
                StackItem::create($itemData);
            }
        });

        return redirect()->route('backoffice.stacks.index')->with('success', 'Stack created successfully.');
    }

    /**
     * Formulaire d'édition d'une stack.
     */
    public function edit(Stack $stack): Response
    {
        return Inertia::render('backoffice/stacks/edit', [
            'stack' => $stack->load('items'),
        ]);
    }

    /**
     * Mettre à jour une stack et synchroniser ses technologies.
     */
    public function update(Request $request, Stack $stack): RedirectResponse
    {
        $validated = $request->validate([
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'items' => ['sometimes', 'array'],
            'items.*.id' => ['sometimes', 'integer', 'exists:stack_items,id'],
            'items.*.name' => ['required_with:items', 'string', 'max:255'],
            'items.*.sort_order' => ['required_with:items', 'integer'],
        ]);

        DB::transaction(function () use ($validated, $stack): void {
            $stack->update($validated);

            $existingItemIds = $stack->items()->pluck('id')->all();
            $submittedItemIds = [];

            foreach ($validated['items'] ?? [] as $itemData) {
                if (isset($itemData['id']) && in_array($itemData['id'], $existingItemIds, true)) {
                    $item = StackItem::find($itemData['id']);
                    $item?->update($itemData);
                    $submittedItemIds[] = (int) $itemData['id'];
                } else {
                    $itemData['stack_id'] = $stack->id;
                    $newItem = StackItem::create($itemData);
                    $submittedItemIds[] = (int) $newItem->id;
                }
            }

            $itemsToDelete = array_diff($existingItemIds, $submittedItemIds);
            if (! empty($itemsToDelete)) {
                StackItem::destroy($itemsToDelete);
            }
        });

        return redirect()->route('backoffice.stacks.index')->with('success', 'Stack updated successfully.');
    }

    /**
     * Réordonner les stacks techniques.
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'stacks' => ['required', 'array'],
            'stacks.*.id' => ['required', 'integer', 'exists:stacks,id'],
            'stacks.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            foreach ($validated['stacks'] as $index => $stack) {
                Stack::where('id', $stack['id'])->update(['sort_order' => $index + 9000]);
            }

            foreach ($validated['stacks'] as $index => $stack) {
                Stack::where('id', $stack['id'])->update(['sort_order' => $index]);
            }
        });

        return redirect()->back()->with('success', 'Stacks sorted successfully.');
    }

    /**
     * Supprimer une stack et ses technologies en cascade.
     */
    public function destroy(Stack $stack): RedirectResponse
    {
        DB::transaction(function () use ($stack): void {
            $stack->items()->delete();
            $stack->delete();
        });

        return redirect()->route('backoffice.stacks.index')->with('success', 'Stack deleted successfully.');
    }
}
