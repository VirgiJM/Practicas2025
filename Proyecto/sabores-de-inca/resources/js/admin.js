document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }

    try {
        const res = await fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            window.location.href = '/login';
            return;
        }

        const user = await res.json();

        if (!user.esAdmin) {
            alert('No tienes permiso para acceder a esta página');
            window.location.href = '/';
            return;
        }

        const adminContent = document.getElementById('admin-content');
        if (adminContent) {
            adminContent.style.display = 'block';
        }

        const nameDisplay = document.getElementById('admin-username');
        if (nameDisplay) {
            nameDisplay.textContent = user.username;
        }

        await cargarRestaurantes();
        await cargarValoraciones();


    } catch (error) {
        console.error('Error al verificar el usuario o cargar datos:', error);
        window.location.href = '/login';
    }

    // Botones para editar o eliminar.
    document.getElementById('restaurant-table-body').addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const idRestaurante = event.target.getAttribute('data-idRestaurante-restaurante');
            borrarRestaurante(idRestaurante);
        }
        if (event.target.classList.contains('edit-btn')) {
            const idRestaurante = event.target.getAttribute('data-idRestaurante-restaurante');
            window.location.href = `/restaurantes/editar/${idRestaurante}`;
        }
    });

    document.getElementById('valoraciones-table-body').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-valoracion-btn')) {
            const id = event.target.getAttribute('data-id-valoracion');
            if (confirm(`¿Eliminar valoración ${id}?`)) {
                await borrarValoracion(id);
            }
        }
    });

    const btnEdit = document.getElementById("add-btn");
    btnEdit.addEventListener("click", (event) => {
        // alert("BU");
        window.location.href = `/restaurantes/crear`;

    })


    async function cargarRestaurantes() {
        const token = localStorage.getItem('token');
        const restRes = await fetch('/api/restaurantes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (restRes.ok) {
            const restaurantes = await restRes.json();
            renderRestaurantes(restaurantes);
        } else {
            console.error('Error al obtener restaurantes');
        }
    }

    // Función para cargar las valoraciones.
    async function cargarValoraciones() {
        const token = localStorage.getItem('token');
        const valRes = await fetch('/api/valoraciones', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (valRes.ok) {
            const valoraciones = await valRes.json();
            renderValoraciones(valoraciones);
        } else {
            console.error('Error al obtener valoraciones');
        }
    }

    // Función para ver las valoracioens.
    function renderValoraciones(valoraciones) {
        const tbody = document.getElementById('valoraciones-table-body');
        tbody.innerHTML = '';

        valoraciones.forEach(val => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
            <td>${val.idValoracion}</td>
            <td>${val.fk_idRestaurante}</td>
            <td>${val.fk_idUsuario}</td>
            <td>${val.Comentario}</td>
            <td>${val.Valoracion}</td>
            <td>
                <button class="delete-valoracion-btn" data-id-valoracion="${val.idValoracion}">Eliminar</button>
            </td>
        `;

            tbody.appendChild(tr);
        });
    }

    // Función para borrar una valoración.
    async function borrarValoracion(id) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`/api/valoracion/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Valoración eliminada correctamente');
                await cargarValoraciones();
            } else {
                const error = await response.json();
                alert('Error al eliminar la valoración: ' + (error.mensaje || ''));
            }
        } catch (e) {
            console.error(e);
            alert('Error al eliminar la valoración.');
        }
    }


    function renderRestaurantes(restaurantes) {
        const tbody = document.getElementById('restaurant-table-body');
        tbody.innerHTML = '';

        restaurantes.forEach(rest => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = rest.idRestaurante;

            const tdNombre = document.createElement('td');
            tdNombre.textContent = rest.Nombre;

            const tdTipo = document.createElement('td');
            let nombreTipoCocina = 'Sin especificar';

            if (rest.tipo_cocina && rest.tipo_cocina.traduccion_esp) {
                nombreTipoCocina = rest.tipo_cocina.traduccion_esp.Nombre;
            }

            tdTipo.textContent = nombreTipoCocina;

            const tdVegano = document.createElement('td');
            if (rest.Vegano == 1) {
                tdVegano.textContent = "Vegano";
                tdVegano.style.color = "#299a56";
            } else {
                tdVegano.textContent = "No vegano";
                tdVegano.style.color = "#ba4d50";
            }

            const tdAcciones = document.createElement('td');
            tdAcciones.innerHTML = `
            <button class="edit-btn" data-idRestaurante-restaurante="${rest.idRestaurante}">Editar</button>
            <button class="delete-btn" data-idRestaurante-restaurante="${rest.idRestaurante}">Eliminar</button>
            `;

            tr.appendChild(tdId);
            tr.appendChild(tdNombre);
            tr.appendChild(tdTipo);
            tr.appendChild(tdVegano);
            tr.appendChild(tdAcciones);

            tbody.appendChild(tr);
        });
    }

    async function borrarRestaurante(idRestaurante) {
        if (!confirm('¿Seguro que quieres eliminar este restaurante?')) {
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`/api/restaurante/${idRestaurante}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Restaurante eliminado correctamente');
                await cargarRestaurantes();
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Error al eliminar:', errorData);
                alert('Error al eliminar el restaurante');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el restaurante');
        }
    }

});
