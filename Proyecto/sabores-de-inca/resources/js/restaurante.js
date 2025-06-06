    document.addEventListener('DOMContentLoaded', () => {
        const token = localStorage.getItem('token');
        console.log("Esto es para ver si recibo bien el token o no: " + token);
    if (token) {
            const form = document.getElementById('formulario-valoracion');
    if (form) {
        form.style.display = 'block';
            }
        }
    });
