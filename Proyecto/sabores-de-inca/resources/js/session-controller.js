document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const noLogin = document.getElementById('no-login');
    const userMenu = document.getElementById('user-menu');
    const logoutButton = document.getElementById('logout-button');
    const profileLink = document.getElementById('profile-link');
    const toggleBtn = document.getElementById('user-dropdown-toggle');
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

            // Mostrar menú de usuario
            if (userMenu) userMenu.style.display = 'inline-block';

            // Mostrar el nombre del usuario en el botón
            if (toggleBtn && user.username) {
                toggleBtn.textContent = `${user.username} ▼`;
            }

            if (profileLink) {
                profileLink.textContent = 'Mi perfil';
            }

            // Mostrar enlace de administración si el usuario es administrador o no.
            const adminButton = document.getElementById('admin-button');
            if (adminButton && user.esAdmin) {
                adminButton.style.display = 'inline-block';
            }
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

    // Menú desplegable
    // const toggleBtn = document.getElementById('user-dropdown-toggle');
    const dropdown = document.getElementById('user-dropdown-content');
    // toggleBtn.textContent = user.username;
    // console.log(username);

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
    });

    // Cierra el menú al hacer clic fuera
    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    // Evita que el clic dentro del menú lo cierre
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

});
