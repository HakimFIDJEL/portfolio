<?php

namespace App\Http\Requests\account;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ResumeRequest extends FormRequest
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
            // Validation du resume
            'resume'        => ['required', 'array', 'size:2'],
            'resume.file'   => ['required', 'file', 'mimes:pdf', 'max:2048'],
            'resume.label'  => ['required', 'string', 'max:255'],
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
            'resume.file.required'  => 'The resume file is required',
            'resume.file.file'      => 'The resume must be a file',
            'resume.file.mimes'     => 'The resume must be a pdf file',
            'resume.file.max'       => 'The resume must be less than 2MB',
            'resume.label.required' => 'The resume label is required',
            'resume.label.string'   => 'The resume label must be a string',
            'resume.label.max'      => 'The resume label must be less than 255 characters',
        ];
    }
}
