# CineMatch - Proyecto de clase

Este es mi proyecto para clase. Se trata de un buscador de series interactivo donde puedes ver series populares, buscar por nombre, filtrarlas por género y ver detalles concretos de cada una en una ventana flotante. Todo está hecho desde cero con HTML, CSS y JavaScript.

## 1. La estructura (HTML)

He dividido el archivo `index.html` en partes lógicas para que el código quede limpio y sea fácil aplicarle estilos después:

- **Header:** El título principal y una barra de búsqueda con un input y un botón.
- **Main:** El contenedor principal. Dentro tiene:
  - Un div `filters` donde el JS inyecta todos los botones de las categorías.
  - Un contenedor `shows-grid` que está vacío en el HTML, funciona como un lienzo donde el JS va añadiendo las tarjetas de las series según llegan de la API.
- **Modal:** Un div oculto (`modal-overlay`) preparado para funcionar como ventana flotante. Tiene la estructura básica vacía (imagen, títulos, resumen) esperando a que el JS la rellene al hacer clic en una serie.
- **Footer:** Un pequeño pie de página.

## 2. El diseño (CSS) - ¡Pendiente para más adelante!

De momento la página se ve un poco fea porque solo tiene el HTML puro. En las próximas clases me encargaré de crear el archivo `style.css` para darle un diseño moderno y oscuro. Mi idea para cuando lo haga es:

- Usar variables CSS para definir una buena paleta de colores.
- Usar Flexbox para alinear el buscador y los filtros.
- Usar CSS Grid para que las tarjetas de las series se adapten a cualquier tamaño de pantalla.

## 3. La funcionalidad (JavaScript)

En `main.js` está la lógica que conecta la web con la API pública de **TVMaze**. Aquí no hay librerías externas ni nada raro, todo es JavaScript puro:

- **Carga inicial:** Nada más abrir la web, se ejecuta la función `cargarSeries()`. Hace un `fetch` a la API, se trae los datos de las series más populares, coge las 40 primeras y llama a `mostrarSeries()` para crear el HTML dinámicamente y meterlo en pantalla.
- **Filtros dinámicos:** La función `crearFiltros()` repasa todas las series descargadas, extrae todos los géneros que existen y crea un botón para cada uno. Al pulsarlos, oculta las series que no coinciden y deja solo las de ese género.
- **Buscador:** Puedes buscar escribiendo el nombre y pulsando Enter (o el botón). Hace un `fetch` a la ruta `/search/shows` de la API, limpia la pantalla y muestra los resultados nuevos.
- **El Modal:** A cada "tarjetita" de serie le añado un escuchador de clics. Cuando pulsas, recojo los datos de esa serie (resumen, estado original, imagen grande), se los meto machacando el HTML interno del `modal-content` y le quito la clase que lo mantenía oculto.

En resumen: los tres lenguajes trabajan unidos para pedir datos a un servidor ajeno y mostrarlos de forma limpia y responsiva.
