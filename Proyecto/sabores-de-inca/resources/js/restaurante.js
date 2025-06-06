document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log("Esto es para ver si recibo bien el token o no: " + token);

    if (token) {
        const form = document.getElementById('formulario-valoracion');
        if (form) {
            form.style.display = 'block';
        }

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
                        location.reload(); // Recarga para ver la valoración en la lista.
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
