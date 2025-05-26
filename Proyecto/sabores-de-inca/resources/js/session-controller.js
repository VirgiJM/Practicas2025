document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const userMenu = document.getElementById('user-menu');
    const logoutButton = document.getElementById('logout-button');

    if (!token) return; // no hacemos nada si no hay token

    try {
        const res = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (res.ok) {
            const user = await res.json();
            // console.log(user); // Devuelve el nombre y el email. Mirar de ponerle la foto.

            // Mostrar menú de usuario
            if (loginLink) loginLink.style.display = 'none';
            if (registerLink) registerLink.style.display = 'none';
            if (userMenu) userMenu.style.display = 'inline-block';

            // (opcional) mostrar el nombre del usuario
            const profileLink = document.getElementById('profile-link');
            const username = document.getElementById('nombre-usuario');
            if (profileLink && user.username) {
                username.textContent = `¡Hola, ${user.username}!`;
                profileLink.textContent = `Mi perfil`;
                // profileLink.textContent = `${user.profile_image}`;
            }

        } else {
            // Token inválido, lo borramos
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        localStorage.removeItem('token');
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    }
});
