document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(span => {
            span.textContent = '';
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const data = {
            Email: document.getElementById('email').value,
            Password: document.getElementById('password').value
        };

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        const responseDiv = document.getElementById('response');

        if (res.ok) {
            // Guardar token con localStroage.
            localStorage.setItem('token', result.access_token);
            console.log(result.token);
            window.location.href = '/'; // Redirigir a la página principal.
        } else {
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
                responseDiv.textContent = result.error;
                responseDiv.style.color = 'red';
            } else {
                responseDiv.textContent = 'Ha ocurrido un error al iniciar sesión.';
                responseDiv.style.color = 'red';
            }
        }
    });
});
