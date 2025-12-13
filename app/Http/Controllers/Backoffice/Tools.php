<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Backoffice\Tool;

class Tools extends Controller
{
    public function index() {
        return Inertia::render('backoffice/tools/index', [
            'tools' => Tool::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
