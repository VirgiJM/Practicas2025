document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log("Esto es para ver si recibo bien el token o no: " + token);

    if (token) {
        // Mostrar formulario si el usuario está logeado
        const form = document.getElementById('formulario-valoracion');
        if (form) form.style.display = 'block';

        // Obtener usuario logeado
        fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(user => {
                console.log("Usuario autenticado recibido:", user);
                const userId = user.idUsuario;

                // Insertar botones de eliminar donde corresponda
                document.querySelectorAll('li.valoracion').forEach(valoracion => {
                    const autorId = valoracion.dataset.usuario; //
                    const idValoracion = valoracion.dataset.id; //
                    console.log("Autor:", autorId, "UserID:", userId, "Coinciden:", parseInt(autorId) === userId);


                    if (parseInt(autorId) === userId) {
                        const boton = document.createElement('button');
                        boton.textContent = '❌';
                        // boton.classList.add('eliminar-btn');
                        boton.className = "delete-btn";
                        boton.dataset.id = idValoracion;

                        boton.addEventListener('click', () => {
                            if (!confirm('¿Seguro que quieres eliminar tu valoración?')) return;

                            fetch(`/api/valoraciones/${idValoracion}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Accept': 'application/json'
                                }
                            })
                                .then(response => {
                                    if (!response.ok) throw new Error('No se pudo eliminar');
                                    valoracion.remove(); // Eliminar del DOM
                                })
                                .catch(error => {
                                    console.error('Error al eliminar la valoración:', error);
                                    alert('Hubo un error al intentar eliminar tu valoración.');
                                });
                        });

                        valoracion.appendChild(boton);
                    }
                });
            })
            .catch(err => {
                console.error('No se pudo obtener el usuario logeado:', err);
            });

        // Enviar nueva valoración
        const nuevaValoracion = document.getElementById('nueva-valoracion');
        if (nuevaValoracion) {
            nuevaValoracion.addEventListener('submit', async (e) => {
                e.preventDefault();

                const valoracion = document.getElementById('valoracion').value;
                const comentario = document.getElementById('comentario').value;
                const restauranteId = document.querySelector('meta[name="restaurante-id"]').getAttribute('content');

                try {
                    const response = await fetch('/api/valoracion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            fk_idRestaurante: restauranteId,
                            Valoracion: valoracion,
                            Comentario: comentario
                        })
                    });

                    if (response.ok) {
                        alert('¡Gracias por valorar el restaurante!');
                        location.reload();
                    } else {
                        const error = await response.json();
                        alert('Error al enviar valoración: ' + (error.mensaje || 'Desconocido'));
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al enviar valoración.');
                }
            });
        }
    }
});
