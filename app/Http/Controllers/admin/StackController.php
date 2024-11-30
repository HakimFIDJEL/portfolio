<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Stack;
use App\Models\StackCategory;

// Request
use App\Http\Requests\stacks\StackRequest;
use App\Http\Requests\stacks\CategoryRequest;

class StackController extends Controller
{
    public function index() {
        $stacks = Stack::with('category')->get();
        return Inertia::render('admin/stacks/Index', [
            'stacks' => $stacks
        ]);
    }

    public function create() {
        return Inertia::render('admin/stacks/Create',[
            'categories' => StackCategory::all()
        ]);
    }

    public function edit(Stack $stack) {
        return Inertia::render('admin/stacks/Edit', [
            'stack' => $stack->load('category'),
            'categories' => StackCategory::all()
        ]);
    }

    public function store(StackRequest $request) {
        $validated = $request->validated();

        
        $stack = Stack::create($validated);
        

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

    public function storeCategory(CategoryRequest $request) {
        $validated = $request->validated();

        StackCategory::create($validated);

        return redirect()->route('admin.stacks.index')->with(['success' => 'Category created successfully']);
    }

    public function deleteCategory(StackCategory $category) {
        $category->delete();
        return redirect()->back()->with(['success' => 'Category deleted successfully']);
    }
}
