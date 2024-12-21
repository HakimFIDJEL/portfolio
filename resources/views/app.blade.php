<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

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
