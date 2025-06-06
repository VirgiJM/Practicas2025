document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    fetch('/api/user', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('No autenticado');
        return response.json();
    })
    .then(data => {
        renderPerfil(data);
        return fetch('/api/favoritos', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar favoritos');
        return response.json();
    })
    .then(favoritos => {
        renderFavoritos(favoritos);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('perfil').innerHTML = '<p>No estás autenticada o hubo un error.</p>';
        document.getElementById('favoritos').innerHTML = '';
    });

    function renderPerfil(user) {
        const perfilDiv = document.getElementById('perfil');
        const imageUrl = `/${user.profile_image}`;
        perfilDiv.innerHTML = `
            <h2>Bienvenida, ${user.username}</h2>
            <img src="${imageUrl}" alt="Imagen de perfil de ${user.username}" style="width:150px; height:150px; object-fit:cover; border-radius:50%;">
            <p>Email: ${user.email}</p>
        `;
    }

    function renderFavoritos(favoritos) {
        const favDiv = document.getElementById('favoritos');
        if (favoritos.length === 0) {
            favDiv.innerHTML = '<p>No tienes restaurantes favoritos.</p>';
            return;
        }

        let html = '';
        favoritos.forEach(restaurante => {
            html += `
                <div class="restaurante-favorito">
                    <h4>${restaurante.Nombre}</h4>
                    <img class="imagen-restaurante" src="/${restaurante.Foto}" alt="${restaurante.Nombre}" style="width:200px; height:auto;">
                    <p>${restaurante.Descripcion || 'Sin descripción'}</p>
                    <p><strong>Dirección:</strong> ${restaurante.Direccion}</p>
                    <p><strong>Precio:</strong> ${restaurante.RangoPrecio}</p>
                </div>
                <hr>
            `;
        });
        favDiv.innerHTML = html;
    }
});
