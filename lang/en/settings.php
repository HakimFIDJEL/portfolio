<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Flash messages
    |--------------------------------------------------------------------------
    |
    */

    'flash' => [
        'profile_updated' => 'Profile informations updated successfully.',
        'password_updated' => 'Password updated successfully.',
        'incorrect_current_password' => 'The provided current password is incorrect.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Pages content
    |--------------------------------------------------------------------------
    |
    */

    'pages' => [

        'breadcrumbs' => [
            'settings' => 'Settings',
            'profile' => 'Profile',
            'appearance' => 'Appearance',
            'password' => 'Password',
        ],

        'layout' => [
            'title' => 'Settings',
            'description' => 'Manage your account settings and preferences.',
        ],

        'profile' => [
            'head_title' => 'Profile settings',

            'info_form' => [
                'title' => 'Profile information',
                'description' => 'Update your profile information such as name and email address.',

                'file_too_big_title' => 'Le fichier est trop volumineux',
                'file_too_big_description' => 'La taille maximale autorisée est de :size Mo.',

                'file_error_type' => 'Type de fichier non supporté.',
                'file_error_type_description' => 'Formats autorisés : PDF, DOC, DOCX.',

                'avatar_too_big_title' => 'The image is too large',
                'avatar_too_big_description' => 'The maximum allowed size is :size MB.',

                'avatar_error_type' => 'Unsupported file type.',
                'avatar_error_type_description' => 'Allowed formats: JPG, PNG, WEBP.',

                'avatar_error_crop' => 'An error occurred while cropping the image.',

                'fields' => [
                    'name' => [
                        'label' => 'Name',
                        'placeholder' => 'Full name',
                    ],
                    'email' => [
                        'label' => 'Email address',
                        'placeholder' => 'Email address',
                    ],
                    'avatar' => [
                        'label' => 'Profile picture',
                        'description' => 'Drop a file or click to select one — max :size MB',
                    ],
                    'resume' => [
                        'label' => 'Curriculum Vitae (CV)',
                        'description' => 'PDF or Word document — max :size MB',
                    ],
                ],

                'buttons' => [
                    'submit' => 'Save information',
                    'upload_file' => 'Upload file', 
                    'select_file' => 'Select file',
                ],

                'crop_title' => 'Crop image',
                'crop_confirm' => 'Confirm',
            ],
        ],

        'appearance' => [
            'head_title' => 'Appearance settings',

            'theme_form' => [
                'title' => 'Theme mode',
                'description' => 'Select the theme mode for your account',
                'options' => [
                    'light' => 'Light',
                    'dark' => 'Dark',
                    'system' => 'System',
                ],
            ],
        ],

        'password' => [
            'head_title' => 'Password settings',

            'form' => [
                'title' => 'Update password',
                'description' => 'Ensure your account is using a long, random password to stay secure.',

                'fields' => [
                    'current_password' => [
                        'label' => 'Current password',
                        'placeholder' => 'Current password',
                    ],
                    'password' => [
                        'label' => 'New password',
                        'placeholder' => 'New password',
                    ],
                    'password_confirmation' => [
                        'label' => 'Confirm password',
                        'placeholder' => 'Confirm password',
                    ],
                ],

                'buttons' => [
                    'submit' => 'Save password',
                ],
            ],
        ],

    ],
];