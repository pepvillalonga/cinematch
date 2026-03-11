# CineMatch - Proyecto de clase

La idea es hacer un buscador de series. De momento solo tengo montada la estructura básica en el HTML y poco a poco iré metiendo el diseño y la funcionalidad.

## Lo que tengo hecho de momento (HTML):

He dividido la página en varias partes lógicas para luego poder darle estilo fácil:

1. **Cabecera (Head):** He puesto lo básico para que se adapte al móvil y he dejado preparado el enlace a mi futuro `style.css`.
2. **Header visible:** El título de la web y una barra con un input y un botón para buscar series.
3. **Main:** Es el contenedor principal. Aquí he dejado:
   - Un div `filters` donde luego meteré botones para filtrar (Acción, Comedia...).
   - Un div vacío `shows-grid` que es donde se van a cargar todas las series.
4. **Modal:** He metido un div oculto (`modal-overlay`) que tiene la estructura de una ventana flotante. Así cuando hagamos click en una serie, se abrirá por encima.
5. **Footer:** Un pequeño texto abajo del todo.

## Lo próximo que haré:

### Fase 1: Darle estilo (CSS)
En la próxima clase voy a crear el `style.css`. Mi plan es:
- Poner un fondo oscuro para que parezca de cine.
- Usar variables CSS para que los colores cuadren bien en todos lados.
- Usar CSS Grid en el div `shows-grid` para que las series se pongan en columnas y se adapten al tamaño de la pantalla (responsive).
- Darle forma de "tarjeta" a cada serie y esconder el modal hasta que haga falta.

### Fase 2: Darle vida (JavaScript)
Por último, crearé el `main.js`.
- Haré un `fetch` a la API pública de TVMaze para traerme series.
- Usaré Javascript para crear elementos HTML dinámicos pidiendo su póster y título, y metiéndolos físicamente dentro de mi `shows-grid`.
- Añadiré un evento al botón de buscar para pedirle otras series a la API.
- Haré que al pulsar en una tarjeta se abra el modal que he dejado preparado en el HTML (cambiándole la clase o el display por CSS) con el resumen de la serie.

