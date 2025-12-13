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

    public function create() {
        return Inertia::render('backoffice/contacts/create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'icon' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);

        $validated['sort_order'] = Contact::max('sort_order') + 1;

        Contact::create($validated);

        return redirect()->route('backoffice.contacts.index')->with('success', 'Contact created successfully.');
    }

    public function edit(Contact $contact) {
        return Inertia::render('backoffice/contacts/edit', [
            'contact' => $contact
        ]);
    }

    public function update(Request $request, Contact $contact) {
        $validated = $request->validate([
            'icon' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'name_fr' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);

        $contact->update($validated);

        return redirect()->route('backoffice.contacts.index')->with('success', 'Contact updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'contacts' => 'required|array',
            'contacts.*.id' => 'integer|exists:contacts,id',
            'contacts.*.sort_order' => 'integer',
        ]);


        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['contacts'] as $index => $contact) {
            Contact::where('id', $contact['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['contacts'] as $index => $contact) {
            Contact::where('id', $contact['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Contacts sorted successfully.');
    }

    public function destroy(Contact $contact) {
        $contact->delete();

        return redirect()->route('backoffice.contacts.index')->with('success', 'Contact deleted successfully.');
    }
}
