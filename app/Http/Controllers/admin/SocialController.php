<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

// Models
use App\Models\Social;

// Request
use App\Http\Requests\socials\SocialRequest;

class SocialController extends Controller
{
    public function index() {
        $socials = Social::all();
        return Inertia::render('admin/socials/Index', [
            'socials' => $socials
        ]);
    }

    public function create() {
        return Inertia::render('admin/socials/Create');
    }

    public function edit(Social $social) {
        return Inertia::render('admin/socials/Edit', [
            'social' => $social
        ]);
    }

    public function store(SocialRequest $request) {
        $validated = $request->validated();

        Social::create($validated);

        return redirect()->route('admin.socials.index')->with(['success' => 'Social created successfully']);
    }

    public function update(Social $social, SocialRequest $request) {
        $validated = $request->validated();

        $social->update($validated);

        return redirect()->route('admin.socials.index')->with(['success' => 'Social updated successfully']);
    }

    public function delete(Social $social) {
        $social->delete();
        return redirect()->route('admin.socials.index')->with(['success' => 'Social deleted successfully']);
    }
}
