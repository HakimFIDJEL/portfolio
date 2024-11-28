<?php

namespace App\Http\Requests\socials;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Facades\Auth;

class SocialRequest extends FormRequest
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
            'label' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255'],
            'svg' => ['required', 'string'],
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
            'label.required' => 'The label is required',
            'label.string' => 'The label must be a string',
            'label.max' => 'The label must be less than 255 characters',
            
            'url.required' => 'The url is required',
            'url.string' => 'The url must be a string',
            'url.max' => 'The url must be less than 255 characters',

            'svg.required' => 'The svg is required',
            'svg.string' => 'The svg must be a string',
        ];
    }
}
