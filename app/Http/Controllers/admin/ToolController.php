<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Tool;
use App\Models\ToolCategory;

// Request
use App\Http\Requests\tools\ToolRequest;
use App\Http\Requests\tools\CategoryRequest;

class ToolController extends Controller
{
    public function index() {
        $tools = Tool::with('category')->get();
        return Inertia::render('admin/tools/Index', [
            'tools' => $tools
        ]);
    }

    public function create() {
        return Inertia::render('admin/tools/Create',[
            'categories' => ToolCategory::all()
        ]);
    }

    public function edit(Tool $tool) {
        return Inertia::render('admin/tools/Edit', [
            'tool' => $tool->load('category'),
            'categories' => ToolCategory::all()
        ]);
    }

    public function store(ToolRequest $request) {
        $validated = $request->validated();

        
        $tool = Tool::create($validated);
        

        return redirect()->route('admin.tools.index')->with(['success' => 'Tool created successfully']);
    }

    public function update(Tool $tool, ToolRequest $request) {
        $validated = $request->validated();

        $tool->update($validated);

        return redirect()->route('admin.tools.index')->with(['success' => 'Tool updated successfully']);
    }

    public function delete(Tool $tool) {
        $tool->delete();
        return redirect()->route('admin.tools.index')->with(['success' => 'Tool deleted successfully']);
    }

    public function storeCategory(CategoryRequest $request) {
        $validated = $request->validated();

        ToolCategory::create($validated);

        return redirect()->route('admin.tools.index')->with(['success' => 'Category created successfully']);
    }

    public function deleteCategory(ToolCategory $category) {

        if($category->tools()->count() > 0) {
            return redirect()->back()->with(['error' => 'The category has tools associated with it']);
        }

        $category->delete();
        return redirect()->back()->with(['success' => 'Category deleted successfully']);
    }
}
