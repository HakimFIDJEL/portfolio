<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Backoffice\Contact;

class Contacts extends Controller
{
    public function index() {
        return Inertia::render('backoffice/contacts/index', [
            'contacts' => Contact::orderBy('sort_order', 'asc')->get()
        ]);
    }
}
