<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Backoffice\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class Contacts extends Controller
{
    /**
     * Liste des moyens de contact.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/contacts/index', [
            'contacts' => Contact::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    /**
     * Formulaire de création de contact.
     */
    public function create(): Response
    {
        return Inertia::render('backoffice/contacts/create');
    }

    /**
     * Persister un nouveau contact.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'icon' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'link' => ['required', 'string', 'max:255'],
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
        ]);

        $validated['sort_order'] = (int) (Contact::max('sort_order') ?? 0) + 1;

        Contact::create($validated);

        return redirect()->route('backoffice.contacts.index')->with('success', 'Contact created successfully.');
    }

    /**
     * Formulaire d'édition de contact.
     */
    public function edit(Contact $contact): Response
    {
        return Inertia::render('backoffice/contacts/edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Mettre à jour un contact.
     */
    public function update(Request $request, Contact $contact): RedirectResponse
    {
        $validated = $request->validate([
            'icon' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'link' => ['required', 'string', 'max:255'],
            'name_fr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
        ]);

        $contact->update($validated);

        return redirect()->route('backoffice.contacts.index')->with('success', 'Contact updated successfully.');
    }

    /**
     * Réordonner les contacts.
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'contacts' => ['required', 'array'],
            'contacts.*.id' => ['required', 'integer', 'exists:contacts,id'],
            'contacts.*.sort_order' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($validated): void {
            foreach ($validated['contacts'] as $index => $contact) {
                Contact::where('id', $contact['id'])->update(['sort_order' => $index + 9000]);
            }

            foreach ($validated['contacts'] as $index => $contact) {
                Contact::where('id', $contact['id'])->update(['sort_order' => $index]);
            }
        });

        return redirect()->back()->with('success', 'Contacts sorted successfully.');
    }

    /**
     * Supprimer un contact.
     */
    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->route('backoffice.contacts.index')->with('success', 'Contact deleted successfully.');
    }
}
