<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Messages flash
    |--------------------------------------------------------------------------
    |
    */
    'flash' => [

        'login' => [
            'invalid_credentials' => 'Les identifiants fournis sont incorrects.',
            'success' => 'Connexion réussie.',
        ],

        'logout' => [
            'success' => 'Déconnexion réussie.',
        ],

        'register' => [
            'success' => 'Inscription réussie !',
        ],

        'password' => [
            'reset_link_sent' => 'Un lien de réinitialisation sera envoyé si le compte existe.',
            'user_not_found' => 'Utilisateur introuvable.',
            'token_missing' => 'Le jeton n\'existe pas.',
            'token_expired' => 'Le jeton a expiré.',
            'token_mismatch' => 'Le jeton ne correspond pas.',
            'reset_success' => 'Mot de passe réinitialisé avec succès !',
        ],

        'verification' => [
            'link_sent' => 'Un lien de vérification a été envoyé à votre adresse e-mail.',
            'invalid_token' => 'Jeton de vérification invalide.',
            'verified_success' => 'Adresse e-mail vérifiée avec succès.',
        ],

        'middleware' => [
            'auth_required' => 'Vous devez être connecté pour accéder à cette ressource.',
            'guest_only' => 'Vous êtes déjà connecté.',
            'verified_required' => 'Vous devez vérifier votre adresse e-mail pour accéder à cette ressource.',
        ],

        'email' => [
            'no_change' => 'La nouvelle adresse e-mail est identique à l\'actuelle.',
            'change' => 'Adresse e-mail mise à jour avec succès !',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Contenu des pages
    |--------------------------------------------------------------------------
    |
    */

    'layout' => [
        'description' => 'Une brève description de l\'application.',
    ],

    'pages' => [

        'login' => [
            'header' => 'Connexion',
            'title' => 'Connexion à votre compte',
            'description' => 'Saisissez votre e-mail et votre mot de passe ci-dessous pour vous connecter',
            'email_label' => 'Adresse e-mail',
            'password_label' => 'Mot de passe',
            'remember_label' => 'Se souvenir de moi',
            'forgot_password' => 'Mot de passe oublié ?',
            'submit_button' => 'Se connecter',
            'home_link' => 'Retour à l\'accueil',
            'register_link' => 'Vous n\'avez pas de compte ?',
            'register_link_text' => 'S\'inscrire',
        ],

        'change_email' => [
            'header' => 'Changer d\'e-mail',
            'title' => 'Modifier votre adresse e-mail',
            'description' => 'Mettez à jour votre adresse e-mail pour sécuriser votre compte ou si votre adresse actuelle n\'est plus valide.',
            'email_label' => 'Adresse e-mail',
            'password_label' => 'Mot de passe',
            'password_placeholder' => 'Mot de passe',
            'submit_button' => 'Modifier l\'adresse e-mail',
            'verify_button' => 'Vérifier l\'adresse e-mail',
            'logout_link' => 'Se déconnecter',
        ],

        'email_verified' => [
            'header' => 'E-mail vérifié',
            'title' => 'E-mail vérifié !',
            'description' => 'Votre adresse e-mail a été vérifiée avec succès.',
            'login_button' => 'Se connecter',
            'home_button' => 'Retour à l\'accueil',
        ],

        'forgot_password' => [
            'header' => 'Mot de passe oublié',
            'title' => 'Mot de passe oublié',
            'description' => 'Saisissez votre e-mail pour recevoir un lien de réinitialisation de mot de passe.',
            'email_label' => 'Adresse e-mail',
            'submit_button' => 'Envoyer le lien de réinitialisation',
            'return_text' => 'Ou, retourner à la',
            'login_link' => 'page de connexion',
        ],

        'register' => [
            'header' => 'Inscription',
            'title' => 'Créer un compte',
            'description' => 'Remplissez les informations ci-dessous pour créer votre compte.',
            'name_label' => 'Nom',
            'name_placeholder' => 'Nom complet',
            'email_label' => 'Adresse e-mail',
            'password_label' => 'Mot de passe',
            'password_placeholder' => 'Mot de passe',
            'password_confirm_label' => 'Confirmer le mot de passe',
            'password_confirm_placeholder' => 'Confirmer le mot de passe',
            'submit_button' => 'Créer un compte',
            'already_text' => 'Vous avez déjà un compte ?',
            'login_link' => 'Se connecter',
        ],

        'reset_password' => [
            'header' => 'Réinitialiser le mot de passe',
            'title' => 'Réinitialiser le mot de passe',
            'description' => 'Veuillez saisir votre nouveau mot de passe ci-dessous.',
            'email_label' => 'E-mail',
            'password_label' => 'Mot de passe',
            'password_placeholder' => 'Mot de passe',
            'password_confirm_label' => 'Confirmer le mot de passe',
            'password_confirm_placeholder' => 'Confirmer le mot de passe',
            'submit_button' => 'Réinitialiser le mot de passe',
            'return_text' => 'Ou, retourner à la',
            'login_link' => 'page de connexion',
        ],

        'verify_email' => [
            'header' => 'Vérification de l\'e-mail',
            'title' => 'Vérifiez votre adresse e-mail',
            'description' => 'Veuillez cliquer sur le bouton ci-dessous pour recevoir un e-mail de vérification.',
            'email_label' => 'Adresse e-mail',
            'submit_button' => 'Envoyer l\'e-mail de vérification',
            'change_email_button' => 'Changer d\'adresse e-mail',
            'logout_link' => 'Se déconnecter',
        ],

    ],

];
