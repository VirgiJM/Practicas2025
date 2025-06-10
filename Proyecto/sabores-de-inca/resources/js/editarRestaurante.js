document.addEventListener('DOMContentLoaded', () => {
    const btnAtras = document.getElementById("atras");

    btnAtras.addEventListener("click", () => {
        // alert("Bu");
        window.location.href = "/admin";
    });
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
            window.location.href = '/admin';
        } else {
            alert('Error al actualizar');
        }
    });
})