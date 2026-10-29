<?php

declare(strict_types=1);

namespace App\Mail\Auth;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        protected User $user,
        protected string $plainToken
    ) {}

    /**
     * Définir l'enveloppe du message (sujet et destinataire).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('notifications.mail.password_reset.subject', ['app' => config('app.name')]),
            to: [new Address($this->user->email, $this->user->name)],
        );
    }

    /**
     * Définir le contenu markdown de l'email.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.auth.password-reset',
            with: [
                'user' => $this->user,
                'url' => route('auth.password.reset', [
                    'token' => $this->plainToken,
                ]),
            ],
        );
    }

    /**
     * Pièces jointes de l'email.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
