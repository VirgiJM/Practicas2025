document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const noLogin = document.getElementById('no-login');
    const userMenu = document.getElementById('user-menu');
    const logoutButton = document.getElementById('logout-button');
    const profileLink = document.getElementById('profile-link');
    const username = document.getElementById('nombre-usuario');

    // Por defecto, ocultamos ambos para que el JS decida cuál mostrar:
    if (noLogin) noLogin.style.display = 'none';
    if (userMenu) userMenu.style.display = 'none';

    if (!token) {
        // No hay token, mostramos menú de login/registro
        if (noLogin) noLogin.style.display = 'block';
        return; // No hace falta seguir.
    }

    try {
        const res = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (res.ok) {
            const user = await res.json();

            // Mostrar botones de favorito (sólo en la página de restaurantes).
            const favoritoBtns = document.querySelectorAll('.favorito-btn');
            if (favoritoBtns.length > 0) { // Si es menor que 0, no dará error, pero devolverá una lista vacía.
                favoritoBtns.forEach(btn => {
                    btn.style.display = 'block';
                });
            }


            // Token válido, mostramos menú de usuario
            if (userMenu) userMenu.style.display = 'inline-block';

            // Mostrar saludo con usuario
            if (username && user.username) {
                username.textContent = `¡Hola, ${user.username}!`;
            }

            if (profileLink) {
                profileLink.textContent = 'Mi perfil';
            }
        } else {
            // Token inválido, borramos y mostramos menú login/registro.
            localStorage.removeItem('token');
            if (noLogin) noLogin.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        localStorage.removeItem('token');
        if (noLogin) noLogin.style.display = 'block';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    }

});
