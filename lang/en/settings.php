<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Flash messages
    |--------------------------------------------------------------------------
    |
    */

    'flash' => [
        'profile_updated' => 'Profile information updated successfully.',
        'password_updated' => 'Password updated successfully.',
        'incorrect_current_password' => 'The provided current password is incorrect.',
        'account_deleted' => 'Your account has been deleted successfully.',
        'language_updated' => 'Language preference updated successfully.',
        'theme_loading' => 'Updating theme...',
        'theme_updated' => 'Theme updated successfully.',
        'color_scheme_loading' => 'Updating color scheme...',
        'color_scheme_updated' => 'Color scheme updated successfully.',
        'notifications_updated' => 'Notification preferences updated successfully.',
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
            'notification' => 'Notifications',
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

                'file_too_big_title' => 'The file is too large',
                'file_too_big_description' => 'The maximum allowed size is :size MB.',

                'file_error_type' => 'Unsupported file type.',
                'file_error_type_description' => 'Allowed formats: PDF, DOC, DOCX.',

                // FRONT ERRORS (React)
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
                    'phone' => [
                        'label' => 'Phone number',
                        'placeholder' => '+33 1 23 45 67 89',
                        'country_search_placeholder' => 'Search a country...',
                    ],
                ],

                'buttons' => [
                    'submit' => 'Save information',
                    'upload_file' => 'Upload file',
                    'select_file' => 'Select file',
                ],

                'crop_title' => 'Crop image',
                'crop_confirm' => 'Confirm',
                'crop_cancel' => 'Cancel',
            ],

            'lang_form' => [
                'title' => 'Language preferences',
                'description' => 'Choose your preferred language and timezone.',

                'fields' => [
                    'language' => [
                        'label' => 'Language',
                        'placeholder' => 'Select your language',
                    ],
                    'timezone' => [
                        'label' => 'Timezone',
                        'placeholder' => 'Select your timezone',
                    ],
                ],
                'buttons' => [
                    'submit' => 'Save preferences',
                ],
            ],

            'delete_account' => [
                'title' => 'Delete account',
                'description' => 'Delete your account and all of its resources.',

                'caution_title' => 'Caution',
                'caution_description' => 'Please proceed with caution, this action is irreversible.',

                'dialog' => [
                    'trigger' => 'Delete account',
                    'title' => 'Are you sure you want to delete your account?',
                    'description' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
                    'fields' => [
                        'password' => [
                            'label' => 'Password',
                            'placeholder' => 'Enter your password',
                        ],
                    ],
                    'buttons' => [
                        'cancel' => 'Cancel',
                        'confirm' => 'Delete account',
                    ],
                ],
            ],
        ],

        'appearance' => [
            'head_title' => 'Appearance settings',

            'theme_form' => [
                'title' => 'Theme mode',
                'description' => 'Select the theme mode for your account.',
                'options' => [
                    'light' => 'Light',
                    'dark' => 'Dark',
                    'system' => 'System',
                ],
            ],

            'color_form' => [
                'title' => 'Color scheme',
                'description' => 'Choose your preferred color theme.',
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

        'notification' => [
            'head_title' => 'Notification settings',

            'phone_number' => [
                'title' => 'Missing phone number',
                'description' => 'Please add a phone number to your account in the "Settings" tab to enable SMS notifications.',
            ],

            'form' => [
                'title' => 'Notification preferences',
                'description' => 'Manage how you receive your notifications.',
                'buttons' => [
                    'submit' => 'Save preferences',
                ],
            ],
        ],
    ],
];
