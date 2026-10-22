<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class Login extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à exécuter cette requête.
     */
    public function authorize(): bool
    {
        return ! Auth::check();
    }

    /**
     * Règles de validation pour la connexion utilisateur.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ];
    }
}
