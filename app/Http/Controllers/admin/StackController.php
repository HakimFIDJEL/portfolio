<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Stack;

// Request
use App\Http\Requests\stacks\StackRequest;

class StackController extends Controller
{
    public function index() {
        $stacks = Stack::all();
        return Inertia::render('admin/stacks/Index', [
            'stacks' => $stacks
        ]);
    }

    public function create() {
        return Inertia::render('admin/stacks/Create');
    }

    public function edit(Stack $stack) {
        return Inertia::render('admin/stacks/Edit', [
            'stack' => $stack
        ]);
    }

    public function store(StackRequest $request) {
        $validated = $request->validated();

        Stack::create($validated);

        return redirect()->route('admin.stacks.index')->with(['success' => 'Stack created successfully']);
    }

    public function update(Stack $stack, StackRequest $request) {
        $validated = $request->validated();

        $stack->update($validated);

        return redirect()->route('admin.stacks.index')->with(['success' => 'Stack updated successfully']);
    }

    public function delete(Stack $stack) {
        $stack->delete();
        return redirect()->route('admin.stacks.index')->with(['success' => 'Stack deleted successfully']);
    }
}
