document.addEventListener('DOMContentLoaded', () => {
    const btnAtras = document.getElementById("atras");

    btnAtras.addEventListener("click", () => {
        window.location.href = "/admin";
    });

    document.getElementById('formEditar').addEventListener('submit', async function (event) {
        event.preventDefault();

        const id = document.getElementById('idRestaurante').value;
        const form = document.getElementById('formEditar');
        const formData = new FormData(form);
        formData.append('_method', 'PUT');

        // Convertir checkbox Vegano a 1 o 0 explícitamente
        formData.set('Vegano', document.getElementById('vegano').checked ? 1 : 0);

        const response = await fetch(`/api/restaurantes/${id}`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json'
            },
            body: formData
        });

        if (response.ok) {
            alert('Restaurante actualizado');
            window.location.href = '/admin';
        } else {
            const errorData = await response.json();
            console.error(errorData);
            alert('Error al actualizar: ' + (errorData.message || 'Ver consola para más detalles'));
        }
    });
});
