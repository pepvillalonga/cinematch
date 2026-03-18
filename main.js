var showsGrid = document.getElementById('shows-grid');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('search-btn');
var sectionTitle = document.getElementById('section-title');
var modalOverlay = document.getElementById('modal-overlay');
var modalContent = document.getElementById('modal-content');
var modalClose = document.getElementById('modal-close');
var filtersDiv = document.getElementById('filters');

var allShows = [];

function cargarSeries() {
    showsGrid.innerHTML = '<p style="text-align:center; padding:40px;">Cargando...</p>';

    fetch('https://api.tvmaze.com/shows?page=0')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allShows = data.slice(0, 40);
            mostrarSeries(allShows);
            crearFiltros();
        });
}

function mostrarSeries(series) {
    showsGrid.innerHTML = '';

    if (series.length === 0) {
        showsGrid.innerHTML = '<p style="text-align:center; padding:40px;">No se encontraron series</p>';
        return;
    }

    for (var i = 0; i < series.length; i++) {
        var show = series[i];
        var card = document.createElement('div');
        card.className = 'show-card';

        var imagen = '';
        if (show.image && show.image.medium) {
            imagen = '<img src="' + show.image.medium + '" alt="' + show.name + '">';
        } else {
            imagen = '<div class="no-image">Sin imagen</div>';
        }

        var nota = show.rating && show.rating.average ? show.rating.average : '-';

        var generos = '';
        for (var g = 0; g < show.genres.length; g++) {
            generos += '<span>' + show.genres[g] + '</span>';
        }

        card.innerHTML = imagen +
            '<div class="show-card-info">' +
            '<h3>' + show.name + '</h3>' +
            '<div class="rating">&#9733; ' + nota + '</div>' +
            '<div class="genres">' + generos + '</div>' +
            '</div>';

        card.setAttribute('data-index', i);
        card.addEventListener('click', abrirModal);
        showsGrid.appendChild(card);
    }
}

function abrirModal(e) {
    var index = this.getAttribute('data-index');
    var show = allShows[index];

    var imagen = '';
    if (show.image) {
        imagen = '<img class="modal-img" src="' + show.image.original + '" alt="' + show.name + '">';
    }

    var nota = show.rating && show.rating.average ? show.rating.average : 'N/A';
    var anyo = show.premiered ? show.premiered.split('-')[0] : '?';
    var resumen = show.summary || '<p>Sin descripcion disponible.</p>';

    modalContent.innerHTML = imagen +
        '<div class="modal-body">' +
        '<h2>' + show.name + '</h2>' +
        '<div class="modal-info">' +
        '<span>Puntuacion: ' + nota + '</span>' +
        '<span>Ano: ' + anyo + '</span>' +
        '<span>Estado: ' + show.status + '</span>' +
        '</div>' +
        '<div class="modal-summary">' + resumen + '</div>' +
        '</div>';

    modalOverlay.classList.add('visible');
}

modalClose.addEventListener('click', function() {
    modalOverlay.classList.remove('visible');
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('visible');
    }
});

searchBtn.addEventListener('click', buscar);

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        buscar();
    }
});

function buscar() {
    var texto = searchInput.value.trim();
    if (texto.length === 0) {
        sectionTitle.textContent = 'Series Populares';
        mostrarSeries(allShows);
        return;
    }

    sectionTitle.textContent = 'Resultados para "' + texto + '"';
    showsGrid.innerHTML = '<p style="text-align:center; padding:40px;">Buscando...</p>';

    fetch('https://api.tvmaze.com/search/shows?q=' + texto)
        .then(function(response) {
            return response.json();
        })
        .then(function(resultados) {
            allShows = [];
            for (var i = 0; i < resultados.length; i++) {
                allShows.push(resultados[i].show);
            }
            mostrarSeries(allShows);
        });
}

function crearFiltros() {
    var generos = [];
    for (var i = 0; i < allShows.length; i++) {
        for (var g = 0; g < allShows[i].genres.length; g++) {
            if (generos.indexOf(allShows[i].genres[g]) === -1) {
                generos.push(allShows[i].genres[g]);
            }
        }
    }
    generos.sort();

    filtersDiv.innerHTML = '';
    var btnTodas = document.createElement('button');
    btnTodas.className = 'filter-btn active';
    btnTodas.setAttribute('data-genre', 'all');
    btnTodas.textContent = 'Todas';
    btnTodas.addEventListener('click', filtrar);
    filtersDiv.appendChild(btnTodas);

    for (var i = 0; i < generos.length; i++) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-genre', generos[i]);
        btn.textContent = generos[i];
        btn.addEventListener('click', filtrar);
        filtersDiv.appendChild(btn);
    }
}

function filtrar() {
    var botones = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < botones.length; i++) {
        botones[i].classList.remove('active');
    }
    this.classList.add('active');

    var genero = this.getAttribute('data-genre');

    if (genero === 'all') {
        sectionTitle.textContent = 'Series Populares';
        mostrarSeries(allShows);
        return;
    }

    var filtradas = [];
    for (var i = 0; i < allShows.length; i++) {
        if (allShows[i].genres.indexOf(genero) !== -1) {
            filtradas.push(allShows[i]);
        }
    }
    sectionTitle.textContent = 'Series de ' + genero;
    mostrarSeries(filtradas);
}

cargarSeries();
