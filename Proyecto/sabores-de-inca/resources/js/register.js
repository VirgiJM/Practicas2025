document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(span => {
            span.textContent = '';
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const data = {
            Username: document.getElementById('username').value,
            Email: document.getElementById('email').value,
            Password: document.getElementById('password').value
        };

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            window.location.href = '/login'; // Redirigir al login si el registro es exitoso
        } else {
            // Mostrar errores específicos debajo de cada input
            if (result.errors) {
                for (const field in result.errors) {
                    const messages = result.errors[field];
                    const errorSpan = document.getElementById(`error-${field.toLowerCase()}`);
                    if (errorSpan) {
                        errorSpan.textContent = messages.join(' ');
                        errorSpan.style.color = 'red';
                    }
                }
            } else if (result.error) {
                // Si hay un error general
                alert(result.error);
            } else {
                alert('Ha ocurrido un error desconocido.');
            }
        }
    });
});
