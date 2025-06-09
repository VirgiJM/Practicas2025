const form = document.getElementById('formCrearRestaurante');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}
    const response = await fetch('/restaurantes', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    });

    const data = await response.json();
    if (response.ok) {
        alert("Restaurante creado correctamente.");
        window.location.href = '/admin';
    } else {
        console.error(data);
        alert("Error al crear el restaurante.");
        console.error(data);
    }
});
