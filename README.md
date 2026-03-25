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

## 2. El diseño (CSS)

En `style.css` he hecho un diseño oscuro tipo app de cine. Lo que he usado:

- He definido **variables CSS** en el `:root` para tener la paleta de colores centralizada (fondo oscuro, color de acento rojo, gris para texto secundario, etc). Así si quiero cambiar algún color solo lo toco en un sitio.
- He usado **Flexbox** para alinear la barra de búsqueda (input + botón) y para los botones de filtros, que se van colocando en fila y si no caben saltan a la siguiente.
- He usado **CSS Grid** en el `shows-grid` con `repeat(auto-fill, minmax(180px, 1fr))` para que las tarjetas se pongan solas en columnas y se adapten al tamaño de la pantalla sin necesidad de muchas media queries.
- Las tarjetas tienen bordes redondeados, la imagen ocupa todo el ancho y los géneros se muestran como etiquetas pequeñas con `flex-wrap: wrap` para que no se salgan de la tarjeta.
- El modal usa `position: fixed` para quedarse por encima de todo, con un fondo semitransparente. Por defecto está en `display: none` y cuando se le añade la clase `.visible` cambia a `display: flex`.

## 3. La funcionalidad (JavaScript)

En `main.js` está la lógica que conecta la web con la API pública de **TVMaze**. Aquí no hay librerías externas ni nada raro, todo es JavaScript puro:

- **Carga inicial:** Nada más abrir la web, se ejecuta la función `cargarSeries()`. Hace un `fetch` a la API, se trae los datos de las series más populares, coge las 40 primeras y llama a `mostrarSeries()` para crear el HTML dinámicamente y meterlo en pantalla.
- **Filtros dinámicos:** La función `crearFiltros()` repasa todas las series descargadas, extrae todos los géneros que existen y crea un botón para cada uno. Al pulsarlos, oculta las series que no coinciden y deja solo las de ese género.
- **Buscador:** Puedes buscar escribiendo el nombre y pulsando Enter (o el botón). Hace un `fetch` a la ruta `/search/shows` de la API, limpia la pantalla y muestra los resultados nuevos.
- **El Modal:** A cada "tarjetita" de serie le añado un escuchador de clics. Cuando pulsas, recojo los datos de esa serie (resumen, estado original, imagen grande), se los meto machacando el HTML interno del `modal-content` y le quito la clase que lo mantenía oculto.

En resumen: los tres lenguajes trabajan unidos para pedir datos a un servidor ajeno y mostrarlos de forma limpia y responsiva.
