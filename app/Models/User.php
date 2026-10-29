<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'verification_token',
        'email_verified_at',
        'avatar_id',
        'resume_id',
    ];

    /**
     * Relations chargées par défaut.
     *
     * @var list<string>
     */
    protected $with = ['avatar', 'resume'];

    /**
     * Les attributs masqués lors de la sérialisation.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_token',
    ];

    /**
     * Les conversions d'attributs.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Jeton de réinitialisation de mot de passe associé.
     */
    public function passwordResetToken(): HasOne
    {
        return $this->hasOne(PasswordResetToken::class, 'email', 'email');
    }

    /**
     * Photo de profil / avatar de l'utilisateur.
     */
    public function avatar(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'avatar_id');
    }

    /**
     * CV téléversé de l'utilisateur.
     */
    public function resume(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'resume_id');
    }
}
