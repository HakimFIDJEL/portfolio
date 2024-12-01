<?php

namespace App\Http\Requests\projects;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Facades\Auth;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            // Validation du projet
            'type'               => ['required', 'string'],
            'title'              => ['required', 'string', 'max:255'],
            'subtitle'           => ['required', 'string', 'max:255'],
            'description'        => ['required', 'string'],
            'feedback'           => ['nullable', 'string'],
            'end_date'           => ['nullable', 'date'],
            'work_in_progress'   => ['required', 'boolean'],
            'source_code_url'    => ['nullable', 'url'],
            'live_demo_url'      => ['nullable', 'url'],
            'timeline_url'       => ['nullable', 'url'],

            // Validation des images
            'images'             => ['nullable', 'array'],
            'images.*.label'     => ['nullable', 'string', 'max:255'],
            'images.*.file'      => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:2048'],

            // Validation de la timeline
            'timeline'           => ['nullable', 'array'],
            'timeline.*.title'   => ['required', 'string', 'max:255'],
            'timeline.*.date'    => ['required', 'date'],
            'timeline.*.duration'=> ['required', 'string', 'max:255'],

            // Validation des stacks
            'stacks'             => ['nullable', 'array'],
            'stacks.*'           => ['integer', 'exists:stacks,id'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            // Validation du projet
            'type.required'               => 'Le type du projet est requis.',
            'type.string'                 => 'Le type du projet doit être une chaîne de caractères.',
            'slug.required'               => 'Le slug du projet est requis.',
            'slug.string'                 => 'Le slug du projet doit être une chaîne de caractères.',
            'slug.unique'                 => 'Le slug du projet doit être unique.',
            'title.required'              => 'Le titre du projet est requis.',
            'title.string'                => 'Le titre du projet doit être une chaîne de caractères.',
            'title.max'                   => 'Le titre du projet ne doit pas dépasser 255 caractères.',
            'subtitle.required'           => 'Le sous-titre du projet est requis.',
            'subtitle.string'             => 'Le sous-titre du projet doit être une chaîne de caractères.',
            'subtitle.max'                => 'Le sous-titre du projet ne doit pas dépasser 255 caractères.',
            'description.required'        => 'La description du projet est requise.',
            'description.string'          => 'La description du projet doit être une chaîne de caractères.',
            'feedback.string'             => 'Le feedback du projet doit être une chaîne de caractères.',
            'end_date.date'               => 'La date de fin du projet doit être une date.',
            'work_in_progress.required'   => 'Le statut du projet est requis.',
            'work_in_progress.boolean'    => 'Le statut du projet doit être un booléen.',
            'source_code_url.url'         => 'L\'URL du code source doit être une URL valide.',
            'live_demo_url.url'           => 'L\'URL du live demo doit être une URL valide.',
            'timeline_url.url'            => 'L\'URL de la timeline doit être une URL valide.',
            
            // Validation des images
            'images.array'                => 'Les images du projet doivent être un tableau.',
            'images.*.label.string'       => 'Le label de l\'image doit être une chaîne de caractères.',
            'images.*.label.max'          => 'Le label de l\'image ne doit pas dépasser 255 caractères.',
            'images.*.file.required'      => 'Le fichier de l\'image est requis.',
            'images.*.file.file'          => 'Le fichier de l\'image doit être un fichier.',
            'images.*.file.mimes'         => 'Le fichier de l\'image doit être une image (jpg, jpeg, png).',
            'images.*.file.max'           => 'Le fichier de l\'image ne doit pas dépasser 2 Mo.',
            
            // Validation de la timeline
            'timeline.array'              => 'La timeline du projet doit être un tableau.',
            'timeline.*.title.required'   => 'Le titre de l\'étape de la timeline est requis.',
            'timeline.*.title.string'     => 'Le titre de l\'étape de la timeline doit être une chaîne de caractères.',
            'timeline.*.title.max'        => 'Le titre de l\'étape de la timeline ne doit pas dépasser 255 caractères.',
            'timeline.*.date.required'    => 'La date de l\'étape de la timeline est requise.',
            'timeline.*.date.date'        => 'La date de l\'étape de la timeline doit être une date.',
            'timeline.*.duration.required'=> 'La durée de l\'étape de la timeline est requise.',
            'timeline.*.duration.string'  => 'La durée de l\'étape de la timeline doit être une chaîne de caractères.',
            'timeline.*.duration.max'     => 'La durée de l\'étape de la timeline ne doit pas dépasser 255 caractères.',
            
            // Validation des stacks
            'stacks.array'                => 'Les stacks du projet doivent être un tableau.',
            'stacks.*.integer'            => 'Les stacks du projet doivent être des entiers.',
            'stacks.*.exists'             => 'Les stacks du projet doivent exister.',
        ];
    }
}
