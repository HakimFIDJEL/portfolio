<?php

// app/Http/Requests/Projects/Store.php

namespace App\Http\Requests\Projects;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class Store
 *
 * Handles the validation for storing a new project.
 */
class Store extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only allow authenticated users to make this request
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
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

            // Attachments
            'attachments' => ['nullable', 'array'],
            'attachments.*.title' => ['nullable', 'string', 'max:255'],
            'attachments.*.file' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:5120'],
        ];
    }
}
