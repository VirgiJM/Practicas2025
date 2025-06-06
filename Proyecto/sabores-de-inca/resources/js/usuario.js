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
            document.getElementById('perfil').innerHTML = '<p>No estás autenticada o se ha producido un error.</p>';
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
        favDiv.innerHTML = ''; // Limpiar contenido anterior.

        favoritos.forEach(restaurante => {
            const slug = restaurante.Slug;

            const card = document.createElement('div');
            card.classList.add('fav-card');

            const link = document.createElement('a');
            link.href = `/restaurante/${slug}`;
            link.classList.add('fav-card-link');

            const img = document.createElement('img');
            img.src = restaurante.Foto;
            img.alt = restaurante.Nombre;
            img.classList.add('fav-card-img');

            link.appendChild(img);
            card.appendChild(link);

            const name = document.createElement('p');
            name.textContent = restaurante.Nombre;
            name.classList.add('fav-card-name');

            card.appendChild(name);

            favDiv.appendChild(card);
        });
    }
});
