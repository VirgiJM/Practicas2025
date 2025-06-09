<!-- Esta va a ser la plantilla de los documentos del proyecto. -->
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <title>@yield('titulo', 'Sabores de Inca')</title> <!-- Esto del yield es como los block que hay en Flask. Este bloque es el del título. -->
    @vite('resources/css/app.css')
    @vite('resources/css/dark-mode.css')
    @vite('resources/js/dark-mode.js')
    @vite('resources/js/session-controller.js', 'module', ['defer'])
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>

    <header class="main-header">
        <div class="container">
            <a href="/" class="center-logo">
                <img class="logo" src="{{ asset('Logo.png') }}" alt="Logo-Sabores-Inca">
            </a>
        </div>
    </header>

    <nav class="barra-nav">
        <div class="nav-links">
            <a href="/">Inicio</a>
            <a href="/restaurantes">Restaurantes</a>
            <a href="/quien-soy">Quién soy</a>

            <!-- Botones login / perfil al mismo nivel que los enlaces -->
            <div class="auth-links">
                <div id="no-login" style="display: none;">
                    <a id="register-link" href="/register">Registrarse</a>
                    <a id="login-link" href="/login">Iniciar sesión</a>
                </div>
                <div id="user-menu" class="dropdown" style="display: none;">
                    <button id="user-dropdown-toggle"></button>
                    <div id="user-dropdown-content" class="dropdown-content">
                        <a id="profile-link" href="/perfil">Mi perfil</a>
                        <a href="/admin" class="admin-link" id=admin-button style="display: none;">Administración</a>
                        <button id="logout-button">Cerrar sesión</button>
                    </div>
                </div>
                <!-- Modo oscuro -->
                <div class="dark-mode-wrapper">
                    <button id="dark-mode-toggle" aria-label="Cambiar modo oscuro">🌓</button>
                </div>
            </div>
        </div>
    </nav>

    <main style="padding: 2rem;">
        @yield('contenido')
    </main>

    <footer style="background-color: #9b0202; padding: 1rem; text-align: center;">
        <p style="color: white">&copy; {{ date('Y') }} Sabores de Inca. Todos los derechos reservados.</p>
    </footer>
</body>

</html>