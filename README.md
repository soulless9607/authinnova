# authinnova
Sistema de autorización
Este script proporciona un sistema de autorización para gestionar cuentas y transacciones. Toma información de un archivo JSON y genera un archivo JSON de salida con la información procesada.

Formato de entrada
El archivo JSON de entrada debe contener un objeto por línea. Cada objeto debe tener una propiedad cuenta con los siguientes campos:

id: El identificador único de la cuenta.
tarjeta_activa: Un valor booleano que indica si la tarjeta está activa
límite_disponible: El saldo disponible para la cuenta
Formato de salida
El archivo JSON de salida contiene un objeto por línea. Cada objeto tiene los siguientes campos:

cuenta: Un objeto con el estado actual de la cuenta, incluyendo los campos tarjeta_activa y límite_disponible
violaciones: una serie de cadenas que indican cualquier infracción encontrada durante el procesamiento, como una identificación de cuenta no válida o saldo insuficiente.
##INTERFAZ EN ANGULAR 
Sistema de autorización angular
Esta aplicación Angular interactúa con un servidor Node.js para administrar la creación de cuentas y la autorización de transacciones según reglas predefinidas.

Empezando
Siga los pasos a continuación para configurar y ejecutar la aplicación.

Requisitos previos
Asegúrate de tener instalado lo siguiente:

Node.js
CLI angular

Clonar el repositorio:

git clone <repositorio_url>

Navegue al directorio del proyecto:

cd sistema-de-autorización-angular

Instalar dependencias:

instalación npm
Ejecutando la aplicación
Inicie el servidor Node.js:

aplicación de nodo.js
El servidor se ejecutará en http://localhost:3000 de forma predeterminada.

Abra una nueva ventana de terminal.

Inicie la aplicación Angular:


ng serve --open

La aplicación Angular se ejecutará en http://localhost:4200 de forma predeterminada.

Abra su navegador web y navegue hasta http://localhost:4200.

#Uso
La aplicación proporciona una interfaz sencilla para crear cuentas y autorizar transacciones. Se comunica con el servidor Node.js para la lógica empresarial.

#Creando una cuenta
Utilice el formulario proporcionado para crear una nueva cuenta. El formulario envía una solicitud al servidor y la respuesta se muestra en la consola del navegador.

#Autorizar una transacción
Complete los detalles de la transacción en el formulario proporcionado y envíelo. La aplicación enviará una solicitud de autorización al servidor y la respuesta se mostrará en la consola del navegador.

#Construido con
Angular
Node.js


Authors
Claudio Gutiérrez.
