<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Backoffice\Education;

class Educations extends Controller
{
    public function index() {
        return Inertia::render('backoffice/educations/index', [
            'educations' => Education::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
