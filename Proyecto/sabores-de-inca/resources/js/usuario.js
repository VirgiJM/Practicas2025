document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

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
            perfilDiv.innerHTML = `
            <h2>Bienvenida, ${data.username}</h2>
            <p>Email: ${data.email}</p>
        `;
        })
        .catch(error => {
            console.error('Error:', error);
            const perfilDiv = document.getElementById('perfil');
            perfilDiv.innerHTML = '<p>No estás autenticada.</p>';
        });
});
