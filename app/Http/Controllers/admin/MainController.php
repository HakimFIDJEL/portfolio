<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class MainController extends Controller
{
    public function home() {
        return Inertia::render('admin/Home');
    }

    
}
