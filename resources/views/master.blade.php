<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="/favicon.ico">
    <title>{{ env('APP_NAME') }}</title>
</head>
<body>
    <div id="app">
        @yield('content')
    </div>
    @vite('resources/js/app.js')
</body>
</html>

