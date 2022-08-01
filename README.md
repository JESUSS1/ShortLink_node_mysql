# Introducción
Este un cortador de enlaces fue creado con las tecnolgias de node y mysql entre otras librerias necesarias.

Una de las librerias usadas es **[uuid](https://www.npmjs.com/package/uuid "uuid")** para generar identificadores unicos que nos servira para usarlos en los enlaces cortos que se mostrará.
El diseño de base que se uso es simple para este ejemplo , se encuentra en el archivo BaseDeDatos.txt de la raiz del proyecto.

**Pre-requisitos : Tener instalado nodeJS, npm y Mysql.**

**1. Clonar el repositorio.**

**2. Crear la base de datos en base:** El modelo que se encuentra en el archivo **BaseDeDatos.txt** de la raiz del proyecto.

**3.  Configurar los datos de conexión:** En el proyecto ir a la carpeta config/conexion.js  y cambiar los datos de conexion , si usas root como usuario lo puedes dejar sino lo cambias por el nombre de otro usuario que uses, igual con la contraseña.

**4. Instalar las dependencias:** en consola debe de ubicarse en la raiz del proyecto.



    npm install

**5. Ejecutar el proyecto**

    nodemon start


**6. Acceder a la pagina**: Desde el navegador ir a http://localhost:3000
