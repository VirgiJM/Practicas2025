<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Registro</title>
    @vite('resources/css/dark-mode.css')
    @vite('resources/js/dark-mode.js')
    @vite('resources/css/register.css')
    @vite('resources/js/register.js')
</head>

<body>
    <h2>Registrarse</h2>
    <form id="register-form">
        <label for="username">Nombre de usuario:</label><br>
        <input type="text" id="username" name="Username" required><br>
        <span id="error-username" class="error-message"></span><br>

        <label for="email">Correo electrónico:</label><br>
        <input type="email" id="email" name="Email" required><br>
        <span id="error-email" class="error-message"></span><br>

        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" name="Password" required><br>
        <span id="error-password" class="error-message"></span><br>

        <button type="submit">Registrarse</button>
    </form>

    <div id="response"></div>

</body>

</html>