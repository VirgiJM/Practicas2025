<!-- Esta va a ser la plantilla de los documentos del proyecto. -->
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <title>@yield('titulo', 'Sabors d\'Inca')</title> <!-- Esto del yield es como los block que hay en Flask. Este bloque es el del título. -->
    @vite('resources/css/app.css')
    @vite('resources/css/dark-mode.css')
    @vite('resources/js/dark-mode.js')
    @vite('resources/js/session-controller.js')
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

</head>

<body>
    <header class="main-header">
        <div class="container">
            <h1 class="logo">Sabores de Inca</h1>

            <div id="no-login" class="auth-links" style="display: none;">
                <a id="register-link" href="/register">Registrarse</a>
                <a id="login-link" href="/login">Iniciar sesión</a>
            </div>

            <div id="user-menu" class="auth-links" style="display: none;">
                <p id="nombre-usuario"></p>
                <a id="profile-link" href="/perfil">Perfil</a>
                <button id="logout-button">Cerrar sesión</button>
            </div>
            <button id="dark-mode-toggle" aria-label="Cambiar modo oscuro">Modo oscuro</button>
        </div>
    </header>

    <nav class="barra-nav">
        <div class="nav-links">
            <a href="/">Inicio</a>
            <a href="/restaurantes">Restaurantes</a>
            <a href="/quien-soy">Quién soy</a>
        </div>
    </nav>

    <main style="padding: 2rem;">
        @yield('contenido')
    </main>

    <footer style="background-color: #f8f8f8; padding: 1rem; text-align: center;">
        <p>&copy; {{ date('Y') }} Sabores de Inca. Todos los derechos reservados.</p>
    </footer>
</body>

</html>