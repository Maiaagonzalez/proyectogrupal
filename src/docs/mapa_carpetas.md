/proyectogrupal
│
├── /.firebase/                       #configuración y datos locales de Firebase
├── /.gitignore                       #Archivos a ignorar por Git
├── /.firebaserc                      #Configuración del proyecto Firebase
├── /firebase.json                    #Archivo de configuración principal de Firebase
│
├── /node_modules/                    #Librerías instaladas con npm (React, Firebase, etc.)
|
├── /public/                          #Archivos públicos (visibles directamente en el navegador)
│   ├── index.html                    #Archivo HTML principal
│   ├── favicon.ico                   #Ícono de la app
│   ├── manifest.json                 #Configuración PWA
│   └── imágenes y logos
│
├── /src/                             #Código fuente principal de la aplicación
│   ├── /components/                  #Componentes React (formularios, listas, etc.)
│   ├── /dataconnect-generated/       #Archivos autogenerados por Firebase Data Connect
│   ├── /pages/                       #Páginas de navegación (Inicio, Login, Registro, etc.)
│   ├── /docs/                        #documentación de la página
│   ├── /providers/                   #rutas y autenticación 
│   ├── firebaseConfig.js             #Inicialización y configuración de Firebase
│   ├── index.css                     #Imágenes y estilos del proyecto
│   ├── App.js                        #Componente principal de React
│   └── index.js                      #Punto de entrada de la app
