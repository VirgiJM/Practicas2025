const form = document.getElementById('formCrearRestaurante');
const nombreInput = document.getElementById('nombre');
const slugInput = document.getElementById('slug');

nombreInput.addEventListener('input', () => {
    const slug = nombreInput.value
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[^a-z0-9\s-]/g, '') // elimina caracteres no válidos
        .trim()
        .replace(/\s+/g, '-'); // convierte espacios en guiones
    slugInput.value = slug;
});


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
