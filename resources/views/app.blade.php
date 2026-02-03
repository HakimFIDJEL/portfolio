<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', session('locale',app()->getLocale())) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';
            const user = '{{ Auth::check() }}'

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }

            if(user) {
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
    <meta name="description" content="Découvrez mes projets, compétences et ambitions en tant qu'apprenti ingénieur FullStack dans le domaine de l'ingénierie informatique.">
    <meta name="author" content="Hakim Fidjel">
    <meta name="keywords" content="Portfolio, Hakim Fidjel, Hakim, Fidjel, FullStack, Engineering Apprentice, Computer Engineering, Projects, Skills, Ambitions">


    <link rel="icon" href="{{asset('favicon.ico')}}" sizes="any" type="image/x-icon">
    <link rel="apple-touch-icon" href="{{asset('apple-touch-icon.png')}}">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
