# Práctica de animaciones con Expo

Aplicación de React Native para practicar gestos, animaciones y sensores. Cada ejercicio tiene su propia pantalla y se abre desde el menú lateral ☰.

## Ejecutar

1. Instala Node.js 22.13 o superior y una versión de Expo Go compatible con Expo SDK 58.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta `npm ci` y luego `npm start`.
4. Con el computador y el celular en la misma red, escanea el QR de Expo. En Android puedes escanearlo desde Expo Go. En iOS usa la cámara.

Para abrir la app en el navegador, ejecuta `npm run web`. Para probar la sacudida con el acelerómetro, usa un celular físico.

## Cómo probar los ejercicios

| Pantalla | Prueba |
| --- | --- |
| Arrastrar y girar | Arrastra el cuadrado hacia ambos lados y cambia de dirección en el mismo gesto. Al soltarlo se queda donde lo dejaste. |
| Animación de carga | Abre la pantalla. El círculo gira mientras la barra se llena y vuelve a comenzar. |
| Gestos multitáctiles | Mueve la imagen. Usa dos dedos para acercar, alejar y girar la imagen al mismo tiempo. |
| Animación de rebote | Mantén presionado el círculo para reducirlo y suelta para que vuelva a su tamaño con rebote. |
| Carrusel animado | Desliza las tarjetas y observa cómo cambian de escala y rotación al acercarse al centro. |
| Acelerómetro | Haz la prueba en un celular físico. En reposo el cuadrado queda quieto y al sacudir el dispositivo oscila. |

## Cómo está organizado

- `app/_layout.jsx` configura el menú lateral con Expo Router. El menú se abre con su botón para evitar que el gesto del borde interfiera con los ejercicios.
- Los demás archivos de `app/` contienen un ejercicio cada uno.
- `components/Ejercicio.jsx` comparte el diseño básico de las pantallas.
- `assets/paisaje.png` es una ilustración local para practicar los gestos sin conexión.

Reanimated conecta los valores de posición, escala o rotación con el estilo de las figuras. Gesture Handler reconoce los movimientos de los dedos y Expo Sensors proporciona los datos del acelerómetro.
