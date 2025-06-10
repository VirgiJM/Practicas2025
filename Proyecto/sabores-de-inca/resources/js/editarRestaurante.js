const token = localStorage.getItem('token');

console.log(token);

if (!token) {
    window.location.href = '/login';
    // return;
}

const res = await fetch('/api/user', {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
});

if (!res.ok) {
    window.location.href = '/login';
    // return;
}

const user = await res.json();

if (!user.esAdmin) {
    alert('No tienes permiso para acceder a esta página');
    window.location.href = '/';
    // return;
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('formEditar').addEventListener('submit', async function (event) {
        event.preventDefault();

        const id = document.getElementById('idRestaurante').value;

        const datos = {
            Nombre: document.getElementById('nombre').value,
            Telefono: document.getElementById('telefono').value,
            Vegano: document.getElementById('vegano').checked,
            Descripcion: document.getElementById('descripcion').value,
            fk_idTipoCocina: document.getElementById('tipoCocina').value
        };

        const response = await fetch(`/api/restaurantes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            alert('Restaurante actualizado');
            window.location.href = '/';
        } else {
            alert('Error al actualizar');
        }
    });
})