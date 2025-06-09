document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }

    const tiposCocina = {
        1: 'Mediterráneo',
        2: 'Italiano',
        3: 'Japonés',
        4: 'Comida rápida',
        5: 'Kebab',
        6: 'Argentino',
        7: 'Indio',
        8: 'Mexicano',
        9: 'Poke / Saludable',
        10: 'Chino'
    };
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

        // Cargar restaurantes
        const restRes = await fetch('/api/restaurantes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (restRes.ok) {
            const restaurantes = await restRes.json();
            console.log(restaurantes);
            renderRestaurantes(restaurantes);
        } else {
            console.error('Error al obtener restaurantes');
        }

    } catch (error) {
        console.error('Error al verificar el usuario o cargar datos:', error);
        window.location.href = '/login';
    }
});

function renderRestaurantes(restaurantes) {
    const tbody = document.getElementById('restaurant-table-body');
    tbody.innerHTML = ''; // Limpia por si acaso

    restaurantes.forEach(rest => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = rest.idRestaurante;

        const tdNombre = document.createElement('td');
        tdNombre.textContent = rest.Nombre;

        const tdTipo = document.createElement('td');
        let nombreTipoCocina = 'Sin especificar';

        if (rest.tipo_cocina) {
            if (rest.tipo_cocina.traduccion_esp) {
                nombreTipoCocina = rest.tipo_cocina.traduccion_esp.Nombre;
            }
        }

        tdTipo.textContent = nombreTipoCocina;
        console.log(nombreTipoCocina);

        const tdVegano = document.createElement('td');
        if (rest.Vegano == 1) {
            tdVegano.textContent = "Vegano";
            tdVegano.style.color = "green";
        } else {
            tdVegano.textContent = "No vegano";
            tdVegano.style.color = "red";
        }

        const tdAcciones = document.createElement('td');
        tdAcciones.innerHTML = `
            <button data-id="${rest.id}" class="edit-btn">Editar</button>
            <button data-id="${rest.id}" class="delete-btn">Eliminar</button>
        `;

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdTipo);
        tr.appendChild(tdVegano);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
    });
}
