<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', session('locale', app()->getLocale())) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? 'system' }}';
            const user = '{{ Auth::check() }}'

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }

            if (user) {
                localStorage.setItem('appearance', appearance);
            }

        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    {{-- SEO --}}
    <title inertia>{{ config('app.name', 'Hakim Fidjel') }}</title>
    <meta name="author" content="Hakim Fidjel">
    <meta name="keywords"
        content="Portfolio, Hakim Fidjel, Hakim, Fidjel, FullStack, Engineering Apprentice, Computer Engineering, Projects, Skills, Ambitions, TenderCrunch">
    <meta property="og:site_name" content="{{ config('app.name', 'Hakim Fidjel') }}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="{{ asset('apple-touch-icon.png') }}">
    <meta name="twitter:card" content="summary_large_image">


    <link rel="icon" href="{{asset('favicon.ico')}}" sizes="any" type="image/x-icon">
    <link rel="apple-touch-icon" href="{{asset('apple-touch-icon.png')}}">

    {{-- Preload primary fonts --}}
    <link rel="preload" href="{{ Vite::asset('resources/fonts/Montserrat_Alternates/MontserratAlternates-Regular.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ Vite::asset('resources/fonts/Montserrat_Alternates/MontserratAlternates-SemiBold.woff2') }}" as="font" type="font/woff2" crossorigin>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>