<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\StackItem;

class Stacks extends Controller
{
    public function index() {
        return Inertia::render('backoffice/stacks/index', [
            'stacks' => Stack::orderBy('sort_order', 'asc')->with('items')->get(),
        ]);
    }

    public function create() {
        return Inertia::render('backoffice/stacks/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',

            'items' => 'sometimes|array',
            'items.*.name' => 'required_with:items|string|max:255',
            'items.*.sort_order' => 'required_with:items|integer',
        ]);

        $validated['sort_order'] = Stack::max('sort_order') + 1;

        $stack = Stack::create($validated);

        foreach ($validated['items'] ?? [] as $itemData) {
            $itemData['stack_id'] = $stack->id;
            StackItem::create($itemData);
        }

        return redirect()->route('backoffice.stacks.index')->with('success', 'Stack created successfully.');
    }

    public function edit(Stack $stack) {
        return Inertia::render('backoffice/stacks/edit', [
            'stack' => $stack->load('items'),
        ]);
    }

    public function update(Request $request, Stack $stack) {
        $validated = $request->validate([
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',

            'items' => 'sometimes|array',
            'items.*.name' => 'required_with:items|string|max:255',
            'items.*.sort_order' => 'required_with:items|integer',
        ]);

        $stack->update($validated);

        // Sync items
        $existingItemIds = $stack->items()->pluck('id')->toArray();
        $submittedItemIds = [];

        foreach ($validated['items'] ?? [] as $itemData) {
            if (isset($itemData['id']) && in_array($itemData['id'], $existingItemIds)) {
                // Update existing item
                $item = StackItem::find($itemData['id']);
                $item->update($itemData);
                $submittedItemIds[] = $itemData['id'];
            } else {
                // Create new item
                $itemData['stack_id'] = $stack->id;
                $newItem = StackItem::create($itemData);
                $submittedItemIds[] = $newItem->id;
            }
        }

        // Delete removed items
        $itemsToDelete = array_diff($existingItemIds, $submittedItemIds);
        StackItem::destroy($itemsToDelete);

        return redirect()->route('backoffice.stacks.index')->with('success', 'Stack updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'stacks' => 'required|array',
            'stacks.*.id' => 'required|integer|exists:stacks,id',
            'stacks.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['stacks'] as $index => $stack) {
            Stack::where('id', $stack['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['stacks'] as $index => $stack) {
            Stack::where('id', $stack['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Stacks sorted successfully.');
    }

    public function destroy(Stack $stack) {
        $stack->delete();
        return redirect()->route('backoffice.stacks.index')->with('success', 'Stack deleted successfully.');
    }
}
