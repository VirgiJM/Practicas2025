document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }
    fetch('/api/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem('token')
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

            // Si el valor en la base de datos es solo el nombre del archivo, ej. "default-profile.png":
            const imageUrl = `/${data.profile_image}`;
            console.log(imageUrl);

            perfilDiv.innerHTML = `
        <h2>Bienvenida, ${data.username}</h2>
        <img src="${imageUrl}" alt="Imagen de perfil de ${data.username}" style="width:150px; height:150px; object-fit:cover; border-radius:50%;">
        <p>Email: ${data.email}</p>
    `;
        })
        .catch (error => {
        console.error('Error:', error);
        const perfilDiv = document.getElementById('perfil');
        perfilDiv.innerHTML = '<p>No estás autenticada.</p>';
    });
});
