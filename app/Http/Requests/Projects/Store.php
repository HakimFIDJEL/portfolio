<?php

declare(strict_types=1);

namespace App\Http\Requests\Projects;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class Store extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à exécuter cette requête.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Règles de validation applicables à la création d'un projet.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'title_fr' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'subtitle_fr' => ['required', 'string', 'max:255'],
            'subtitle_en' => ['required', 'string', 'max:255'],
            'slug_fr' => ['required', 'string', 'max:255', 'unique:projects,slug_fr'],
            'slug_en' => ['required', 'string', 'max:255', 'unique:projects,slug_en'],
            'description_fr' => ['nullable', 'string'],
            'description_en' => ['nullable', 'string'],
            'feedback_fr' => ['nullable', 'string'],
            'feedback_en' => ['nullable', 'string'],
            'what_i_learned_fr' => ['nullable', 'string'],
            'what_i_learned_en' => ['nullable', 'string'],
            'is_new' => ['boolean'],
            'type' => ['nullable', 'string', 'in:project,sandbox'],
            'end_date' => ['nullable', 'date'],
            'source_code_url' => ['nullable', 'url', 'max:255'],
            'live_demo_url' => ['nullable', 'url', 'max:255'],

            // Relations
            'tags' => ['nullable', 'array'],
            'tags.*.id' => ['required', 'integer', 'exists:tags,id'],
            'stackItems' => ['nullable', 'array'],
            'stackItems.*.id' => ['required', 'integer', 'exists:stack_items,id'],

            // Pièces jointes
            'attachments' => ['nullable', 'array'],
            'attachments.*.title' => ['nullable', 'string', 'max:255'],
            'attachments.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:5120'],
        ];
    }
}
