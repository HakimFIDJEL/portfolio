<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\PasswordResetToken;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
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

    protected $with = ['avatar', 'resume'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_token',
    ];

    /**
     * Get the attributes that should be cast.
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
     * Custom methods
     */
    public function passwordResetToken() {
        return $this->hasOne(PasswordResetToken::class, 'email', 'email');
    }

    public function avatar() {
        return $this->belongsTo(Attachment::class, 'avatar_id');
    }

    public function resume() {
        return $this->belongsTo(Attachment::class, 'resume_id');
    }
}
