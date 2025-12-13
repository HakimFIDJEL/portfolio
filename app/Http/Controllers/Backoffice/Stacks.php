<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Backoffice\Stack;

class Stacks extends Controller
{
    public function index() {
        return Inertia::render('backoffice/stacks/index', [
            'stacks' => Stack::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
