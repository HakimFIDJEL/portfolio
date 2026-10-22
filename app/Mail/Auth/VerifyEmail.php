<?php

declare(strict_types=1);

namespace App\Mail\Auth;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        protected User $user,
        protected string $token
    ) {}

    /**
     * Définir l'enveloppe du message (sujet et destinataire).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('notifications.mail.verify_email.subject', ['app' => config('app.name')]),
            to: [new Address($this->user->email, $this->user->name)],
        );
    }

    /**
     * Définir le contenu markdown de l'email.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.auth.verify-email',
            with: [
                'user' => $this->user,
                'url' => route('auth.verification.verify', [
                    'token' => $this->token,
                ]),
            ],
        );
    }

    /**
     * Pièces jointes de l'email.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
