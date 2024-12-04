<?php

namespace App\Http\Requests\account;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PfpRequest extends FormRequest
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
            // Validation du pfp
            'pfp'        => ['required', 'array', 'size:2'],
            'pfp.file'   => ['required', 'file', 'mimes:jpeg,png', 'max:2048'],
            'pfp.label'  => ['required', 'string', 'max:255'],
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
            'pfp.file.required'  => 'The profile picture is required',
            'pfp.file.file'      => 'The profile picture must be a file',
            'pfp.file.mimes'     => 'The profile picture must be a jpeg or png file',
            'pfp.file.max'       => 'The profile picture must be less than 2MB',
            'pfp.label.required' => 'The label is required',
            'pfp.label.string'   => 'The label must be a string',
            'pfp.label.max'      => 'The label must be less than 255 characters',
        ];
    }
}
