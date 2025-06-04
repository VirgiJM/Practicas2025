document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log("Token usado:", token);

    if (!token) {
        window.location.href = '/login';
        return;
    }

    fetch('/api/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No autenticado');
            }
            return response.json();
        })
        .then(data => {
            const perfilDiv = document.getElementById('perfil');
            const imageUrl = `/${data.profile_image}`;

            perfilDiv.innerHTML = `
            <h2>Bienvenida, ${data.username}</h2>
            <img src="${imageUrl}" alt="Imagen de perfil de ${data.username}" style="width:150px; height:150px; object-fit:cover; border-radius:50%;">
            <p>Email: ${data.email}</p>
        `;

            // Cargar los restaurantes favoritos
            return fetch('/api/favoritos', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar favoritos');
            }
            return response.json();
        })
        .then(favoritos => {
            console.log('Favoritos recibidos:', favoritos); // 👈 Añade este console.log

            const favDiv = document.getElementById('favoritos');
            // favDiv.innerHTML = '<h3>Restaurantes favoritos:</h3>';

            if (favoritos.length === 0) {
                favDiv.innerHTML += '<p>No tienes restaurantes favoritos.</p>';
            } else {
                favoritos.forEach(restaurante => {
                    favDiv.innerHTML += `
                <div class="restaurante-favorito">
                    <h4>${restaurante.Nombre}</h4>
                    <img src="/${restaurante.Foto}" alt="${restaurante.Nombre}" style="width:200px; height:auto;">
                    <p>${restaurante.Descripcion || 'Sin descripción'}</p>
                    <p><strong>Dirección:</strong> ${restaurante.Direccion}</p>
                    <p><strong>Precio:</strong> ${restaurante.RangoPrecio}</p>
                </div>
                <hr>
            `;
                });
            }
        })

        .catch(error => {
            console.error('Error:', error);
            const perfilDiv = document.getElementById('perfil');
            perfilDiv.innerHTML = '<p>No estás autenticada.</p>';
        });
});
