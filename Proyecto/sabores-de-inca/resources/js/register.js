document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const password = form.Password.value;
    const confirmPassword = form.Password_confirmation.value;

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
        document.getElementById('errors').innerText = 'Las contraseñas no coinciden.';
        return; // Evita enviar la solicitud
    }

    const data = {
        Username: form.Username.value,
        Email: form.Email.value,
        Password: password,
        Password_confirmation: confirmPassword
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
        } else {
            let messages = [];
            for (let field in result.errors) {
                messages.push(result.errors[field].join(', '));
            }
            document.getElementById('errors').innerText = messages.join('\n');
        }

    } catch (error) {
        console.error('Error:', error);
    }
});
