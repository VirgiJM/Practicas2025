// Selecciono todos los elementos con clase 'slide'.
const slides = document.querySelectorAll('.slide');

// Variable para saber cuál es la diapsitiva actual.
let currentSlide = 0;

function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
        if (i === index) {
            slides[i].classList.add('active'); // Añade la clase "active" solo a la slide que debe mostrarse
        } else {
            slides[i].classList.remove('active'); // Quita la clase "active" a todas las demás
        }
    }
}

setInterval(() => {
    currentSlide = currentSlide + 1; // Avanza a la siguiente diapositiva.
    if (currentSlide >= slides.length) { // Si ha llegado al final, vuelve a la primera diapositiva.
        currentSlide = 0;
    }
    showSlide(currentSlide);
}, 5000);

// Al cargar la página, se muetsra la primera diapositiva.
showSlide(currentSlide);
