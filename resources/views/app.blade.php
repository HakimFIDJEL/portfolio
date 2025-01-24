<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="og:title" content="Hakim - My portfolio">
    <meta name="og:site-name" content="hakimfidjel.fr">
    <meta name="og:description" content="Portfolio of Hakim Fidjel, a FullStack engineering apprentice. Discover my projects, skills, and ambitions across the diverse fields of computer engineering.">
    <meta name="og:type" content="website">
    <meta name="og:url" content="https://hakimfidjel.fr">
    <meta name="og:image" content="https://hakimfidjel.fr/favicon.webp">

    {{-- Favicon --}}
    <link rel="icon" href="{{ asset('favicon.webp') }}" type="image/x-icon" />
    

    @viteReactRefresh

    @vite('resources/js/app.jsx')

    @php
        $request = Request::path();
    @endphp

    @if (str_starts_with($request, 'admin') || str_starts_with($request, 'auth'))
        @vite('resources/css/app.css')
    @elseif(str_starts_with($request, 'graphic'))
        @vite('resources/scss/graphic.scss')
    @else
        @vite('resources/scss/minimalist.scss')
    @endif

    @routes

    @inertiaHead
</head>

<body class="dark">
    @inertia
</body>

</html>
