<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Backoffice\Tag;

class Tags extends Controller
{
    public function index() {
        return Inertia::render('backoffice/tags/index', [
            'tags' => Tag::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
