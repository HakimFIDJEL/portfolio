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
            // Project validation
            'type.required'               => 'The project type is required.',
            'type.string'                 => 'The project type must be a string.',
            'slug.required'               => 'The project slug is required.',
            'slug.string'                 => 'The project slug must be a string.',
            'slug.unique'                 => 'The project slug must be unique.',
            'title.required'              => 'The project title is required.',
            'title.string'                => 'The project title must be a string.',
            'title.max'                   => 'The project title must not exceed 255 characters.',
            'subtitle.required'           => 'The project subtitle is required.',
            'subtitle.string'             => 'The project subtitle must be a string.',
            'subtitle.max'                => 'The project subtitle must not exceed 255 characters.',
            'description.required'        => 'The project description is required.',
            'description.string'          => 'The project description must be a string.',
            'feedback.string'             => 'The project feedback must be a string.',
            'end_date.date'               => 'The project end date must be a valid date.',
            'work_in_progress.required'   => 'The project status is required.',
            'work_in_progress.boolean'    => 'The project status must be a boolean.',
            'source_code_url.url'         => 'The source code URL must be a valid URL.',
            'live_demo_url.url'           => 'The live demo URL must be a valid URL.',
            'timeline_url.url'            => 'The timeline URL must be a valid URL.',
        
            // Image validation
            'images.array'                => 'The project images must be an array.',
            'images.*.label.string'       => 'The image label must be a string.',
            'images.*.label.max'          => 'The image label must not exceed 255 characters.',
            'images.*.file.required'      => 'The image file is required.',
            'images.*.file.file'          => 'The image file must be a valid file.',
            'images.*.file.mimes'         => 'The image file must be an image (jpg, jpeg, png).',
            'images.*.file.max'           => 'The image file must not exceed 2 MB.',
        
            // Timeline validation
            'timeline.array'              => 'The project timeline must be an array.',
            'timeline.*.title.required'   => 'The timeline step title is required.',
            'timeline.*.title.string'     => 'The timeline step title must be a string.',
            'timeline.*.title.max'        => 'The timeline step title must not exceed 255 characters.',
            'timeline.*.date.required'    => 'The timeline step date is required.',
            'timeline.*.date.date'        => 'The timeline step date must be a valid date.',
            'timeline.*.duration.required'=> 'The timeline step duration is required.',
            'timeline.*.duration.string'  => 'The timeline step duration must be a string.',
            'timeline.*.duration.max'     => 'The timeline step duration must not exceed 255 characters.',
        
            // Stacks validation
            'stacks.array'                => 'The project stacks must be an array.',
            'stacks.*.integer'            => 'The project stacks must be integers.',
            'stacks.*.exists'             => 'The project stacks must exist.',
        ];
        
    }
}
