<?php

declare(strict_types=1);

namespace App\Http\Requests\Projects;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class Update extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à exécuter cette requête.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Règles de validation applicables à la mise à jour d'un projet.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $projectId = $this->route('project')?->id ?? $this->project?->id;

        return [
            'title_fr' => ['required', 'string', 'max:255'],
            'title_en' => ['required', 'string', 'max:255'],
            'subtitle_fr' => ['required', 'string', 'max:255'],
            'subtitle_en' => ['required', 'string', 'max:255'],
            'slug_fr' => ['required', 'string', 'max:255', Rule::unique('projects', 'slug_fr')->ignore($projectId)],
            'slug_en' => ['required', 'string', 'max:255', Rule::unique('projects', 'slug_en')->ignore($projectId)],
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
            'attachments.*.id' => ['nullable', 'string'],
            'attachments.*.title' => ['nullable', 'string', 'max:255'],
            'attachments.*.file' => Rule::forEach(static fn (mixed $value): array => is_array($value)
                ? ['array']
                : ['required', 'file', 'mimes:jpg,jpeg,png', 'max:5120']),
        ];
    }
}
