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

    public function edit(social $social) {
        return Inertia::render('admin/socials/Edit', [
            'social' => $social
        ]);
    }

    public function store(socialRequest $request) {
        $validated = $request->validated();

        Social::create($validated);

        return redirect()->route('admin.socials.index')->with(['success' => 'Social created successfully']);
    }

    public function update(social $social, socialRequest $request) {
        $validated = $request->validated();

        $social->update($validated);

        return redirect()->route('admin.socials.index')->with(['success' => 'Social updated successfully']);
    }

    public function delete(social $social) {
        $social->delete();
        return redirect()->route('admin.socials.index')->with(['success' => 'Social deleted successfully']);
    }
}
