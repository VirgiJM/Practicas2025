document.addEventListener("DOMContentLoaded", () => {
    // Variable para almacenar el tipo seleccionado, 0 = todos.
    let tipoSeleccionado = 0;
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        document.querySelectorAll('.favorito-btn').forEach(btn => btn.style.display = 'none');
    }
    const map = L.map('map').setView([39.718, 2.911], 17); // Coordenadas de Inca.

    // Iconos por tipo de cocina.
    const iconosPorTipo = {
        1: L.icon({ iconUrl: '/images/markers/marcador-azul-marino.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        2: L.icon({ iconUrl: '/images/markers/marcador-rojo.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        3: L.icon({ iconUrl: '/images/markers/marcador-rosa.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        4: L.icon({ iconUrl: '/images/markers/marcador-negro.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        5: L.icon({ iconUrl: '/images/markers/marcador-marron.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        6: L.icon({ iconUrl: '/images/markers/marcador-naranja.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        7: L.icon({ iconUrl: '/images/markers/marcador-turquesa.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        8: L.icon({ iconUrl: '/images/markers/marcador-amarillo.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        9: L.icon({ iconUrl: '/images/markers/marcador-light-green.png', shadowUrl: '/images/markers/marker-shadow.png' }),
        10: L.icon({ iconUrl: '/images/markers/marcador-lila.png', shadowUrl: '/images/markers/marker-shadow.png' })
    };

    // Cargar mapa base.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Tipos de cocina (para select y leyenda).
    const tiposCocina = {
        1: 'Mediterráneo',
        2: 'Italiano',
        3: 'Japonés',
        4: 'Comida rápida',
        5: 'Kebab',
        6: 'Argentino',
        7: 'Indio',
        8: 'Mexicano',
        9: 'Poke / Saludable',
        10: 'Chino'
    };

    // Input de la web.
    const selectTipo = document.getElementById('tipoCocina');
    if (selectTipo) {
        // Vaciar select por si hay algo.
        selectTipo.innerHTML = '';

        // Añadir opción "Todos".
        const optionTodos = document.createElement('option');
        optionTodos.value = 0;
        optionTodos.textContent = 'Todos';
        selectTipo.appendChild(optionTodos);

        // Añadir cada tipo de cocina.
        for (const id in tiposCocina) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = tiposCocina[id];
            selectTipo.appendChild(option);
        }
    }

    const checkboxVegano = document.getElementById('vegano'); // Checkbox para opciones veganas.
    const selectMedia = document.getElementById('filtroMedia'); // Select para filtrar a partir de x cantidad de estrellas.
    const selectRangoPrecio = document.getElementById('rangoPrecio');

    // Variable global para los marcadores en el mapa.
    if (!window.marcadoresLayer) {
        window.marcadoresLayer = L.layerGroup().addTo(map);
    }

    // Función para cargar restaurantes en mapa y lista según filtros.
    function cargarRestaurantes(vegano = null, tipoCocina = 0, media = 0, rangoPrecio = 0) {
        console.log("Filtros recibidos:", { vegano, tipoCocina, media, rangoPrecio });
        let urlApi = '/api/restaurantes?';
        if (vegano !== null) {
            urlApi += `vegano=${vegano}&`;
        }
        if (tipoCocina && tipoCocina != 0) {
            urlApi += `tipoCocina=${tipoCocina}&`;
        }
        if (media && media != 0) {
            urlApi += `mediaMinima=${media}&`;

        }
        if (rangoPrecio && rangoPrecio != 0) {
            urlApi += `rangoPrecio=${rangoPrecio}&`;
        }
        urlApi = urlApi.slice(0, -1);

        console.log("URL API que se está llamando:", urlApi);

        fetch(urlApi)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then(restaurantes => {
                console.log('Datos recibidos de la API:', restaurantes);
                window.marcadoresLayer.clearLayers();

                restaurantes.forEach(rest => {
                    if (rest.Latitud && rest.Longitud) {
                        const icono = iconosPorTipo[rest.fk_idTipoCocina] || L.icon.default;
                        const marker = L.marker([rest.Latitud, rest.Longitud], { icon: icono });
                        // marker.bindPopup(`<strong>${rest.Nombre}</strong><br>${rest.Direccion || ''}`);
                        marker.bindPopup(`<strong><a href="/restaurante/${encodeURIComponent(rest.Slug.toLowerCase().replace(/\s+/g, '-'))}" style="text-decoration: none; color: #007bff;">${rest.Nombre}</a></strong><br>${rest.Direccion || ''}
`);
                        marker.addTo(window.marcadoresLayer);
                    }
                });

                actualizarListaHtml(restaurantes);
            })
            .catch(err => console.error('Error al cargar restaurantes:', err));
    }

    // Función para actualizar la lista HTML a partir de un array de restaurantes.
    function actualizarListaHtml(restaurantesFiltrados) {
        const tarjetas = document.querySelectorAll('.restaurante-card');

        tarjetas.forEach(tarjeta => {
            const esVegano = tarjeta.dataset.vegano === "1" || tarjeta.dataset.vegano === "true";
            const tipo = parseInt(tarjeta.dataset.tipo, 10);

            // Buscar si la tarjeta está en el array filtrado.
            const nombreTarjeta = tarjeta.querySelector('.details h3').textContent;

            const estaEnFiltro = restaurantesFiltrados.some(rest => rest.Nombre === nombreTarjeta);

            if (estaEnFiltro) {
                tarjeta.style.display = "block"; // Mostrar.
            } else {
                tarjeta.style.display = "none"; // Ocultar.
            }
        });
    }

    // Leer filtros actuales y recargar datos.
    function actualizarFiltros() {
        const vegano = checkboxVegano.checked ? 1 : 0;
        const tipoCocina = parseInt(selectTipo.value, 10) || 0;
        const media = parseInt(selectMedia.value, 10) || 0;
        const rangoPrecio = selectRangoPrecio.value; // NO ES NUMÉRICO!!!
        cargarRestaurantes(vegano, tipoCocina, media, rangoPrecio);
    }

    selectRangoPrecio.addEventListener('change', actualizarFiltros);
    // Inicializar carga.
    actualizarFiltros();

    // Asegurar que el select y la leyenda estén sincronizados al inicio
    if (selectTipo) {
        tipoSeleccionado = parseInt(selectTipo.value, 10) || 0;
        actualizarEstiloLeyenda(tipoSeleccionado);
    }

    // Pintar los favoritos.
    let favoritosIds = [];

    fetch('/api/favoritos/ids', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                favoritosIds = data;
                console.log('IDs de favoritos recibidos:', favoritosIds);
                pintarCorazones();
            } else {
                console.warn('Respuesta inesperada:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener los favoritos:', error);
        });


    function pintarCorazones() {
        document.querySelectorAll('.favorito-btn').forEach(btn => {
            const restauranteId = parseInt(btn.dataset.restauranteId);
            if (favoritosIds.includes(restauranteId)) {
                btn.querySelector('i').classList.remove('fa-regular');
                btn.querySelector('i').classList.add('fa-solid');
            }
        });
    }

    // Listeners de filtros.
    checkboxVegano.addEventListener('change', actualizarFiltros);
    selectTipo.addEventListener('change', actualizarFiltros);
    selectMedia.addEventListener('change', actualizarFiltros);
    selectRangoPrecio.addEventListener('change', actualizarFiltros);


    // Leyenda en el mapa.
    const leyenda = L.control({ position: 'bottomright' });

    leyenda.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        for (const id in tiposCocina) {
            const iconPath = iconosPorTipo[id]?.options.iconUrl || '';
            div.innerHTML += `
            <div class="leyenda-item" data-tipo="${id}" style="display: flex; align-items: center; margin-bottom: 4px; cursor: pointer;">
                <img src="${iconPath}" style="width: 20px; height: 30px; margin-right: 6px;">
                <span>${tiposCocina[id]}</span>
            </div>
        `;
        }
        return div;
    };

    leyenda.addTo(map);

    // Esperar a que el div de leyenda se inyecte antes de añadir el listener.
    setTimeout(() => {
        const leyendaDiv = document.querySelector('.info.legend');
        if (!leyendaDiv) return;

        leyendaDiv.addEventListener('click', (e) => {
            e.preventDefault();
            const item = e.target.closest('.leyenda-item');
            if (!item) return;

            const tipo = parseInt(item.dataset.tipo, 10);

            // Toggle del filtro
            tipoSeleccionado = (tipoSeleccionado === tipo) ? 0 : tipo;

            // Sincronizar el select
            if (selectTipo) {
                selectTipo.value = tipoSeleccionado;
            }

            // Actualizar estilo de la leyenda
            actualizarEstiloLeyenda(tipoSeleccionado);

            // Recargar restaurantes
            const vegano = checkboxVegano.checked ? 1 : 0;
            cargarRestaurantes(vegano, tipoSeleccionado);
        });
    }, 0);


    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.favorito-btn');
        if (!btn) {
            return;
        }

        e.stopPropagation();
        const icon = btn.querySelector('i');
        const restauranteId = btn.dataset.restauranteId;

        fetch('/api/favoritos/toggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ fk_idRestaurante: restauranteId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.estado === 'añadido') {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                    icon.style.color = 'red';
                } else if (data.estado === 'eliminado') {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                    icon.style.color = '';
                }
            })
            .catch(error => {
                console.error('Error al hacer toggle del favorito:', error);
            });
    });

    // Función para actualizar el estilo de la leyenda
    function actualizarEstiloLeyenda(tipo) {
        document.querySelectorAll('.leyenda-item').forEach(el => {
            el.style.fontWeight = '';
        });

        if (tipo !== 0) {
            const activeItem = document.querySelector(`.leyenda-item[data-tipo="${tipo}"]`);
            if (activeItem) {
                activeItem.style.fontWeight = 'bold';
            }
        }
    }

    // Escuchar cambios en el select de tipo de cocina
    if (selectTipo) {
        selectTipo.addEventListener('change', function () {
            tipoSeleccionado = parseInt(this.value, 10) || 0;
            actualizarEstiloLeyenda(tipoSeleccionado);
            const vegano = checkboxVegano.checked ? 1 : 0;
            cargarRestaurantes(vegano, tipoSeleccionado);
        });
    }
});
