# Práctica: Uso de Cluster y PM2 en Node.js

## 1. Introducción

En esta práctica se analiza el impacto del uso de **cluster** en aplicaciones Node.js intensivas en CPU, así como el uso del gestor de procesos **PM2** para mejorar la disponibilidad y el rendimiento. Para ello se implementa una API sencilla con y sin cluster, se somete a pruebas de carga con `loadtest` y se comparan los resultados obtenidos.

## 2. Preparación del entorno

Primero inicializamos el proyecto node.js e instalamos el framework Express mediante npm.

![Inicialización npm y Express](img/01_inicializar_npm_y_instalar_express.png)

Creo el archivo `app_sin_cluster.js`, que implementa la aplicación Node.js sin uso de cluster.

![Creación app sin cluster](img/02_creacion_archivo_app_sin_cluster.png)

## 3. Aplicación sin cluster

Despliegue de la aplicación sin cluster utilizando el comando `node app_sin_cluster.js`.

![Despliegue app sin cluster](img/08_despliegue_node_app_sin_cluster.png)

Acceso correcto a la ruta raíz (`/`) de la aplicación sin cluster desde el navegador.

![Acceso root sin cluster](img/04_acceso_app_sin_cluster_root.png)

Acceso a la ruta `/api/50`, comprobando el funcionamiento correcto del endpoint.

![Acceso API 50 sin cluster](img/05_acceso_app_sin_cluster_api_50.png)

Acceso a la ruta `/api/50000000000` mostrando el tiempo de respuesta en la primera medición.

![API grande tiempo 1](img/06_acceso_app_sin_cluster_api_50000000000_con_metrica_de_tiempo_1o.png)

Segunda medición del tiempo de respuesta para la misma petición.

![API grande tiempo 2](img/07_acceso_app_sin_cluster_api_50000000000_con_metrica_de_tiempo_2o.png)

## 4. Aplicación con cluster

Despliegue de la aplicación con cluster, donde se crean múltiples workers según los núcleos de la CPU.

![Despliegue app cluster](img/03_despliegue_node_app_cluster.png)

Primera medición del tiempo de respuesta accediendo a `/api/50000000000` con la aplicación en modo cluster.

![Cluster tiempo 1](img/09_acceso_app_cluster_api_50000000000_con_metrica_de_tiempo_1o.png)

Segunda medición del tiempo de respuesta, observándose una mejora respecto a la versión sin cluster.

![Cluster tiempo 2](img/10_acceso_app_cluster_api_50000000000_con_metrica_de_tiempo_2o.png)

## 5. Pruebas de carga con Loadtest

Resultados de `loadtest` sobre la aplicación sin cluster, con una carga no tan grande.

![Loadtest sin cluster 500k](img/11_loadtest_app_sin_cluster_api_500000.png)

Resultados de `loadtest` sobre la aplicación sin cluster con una carga más grande.

![Loadtest sin cluster 500M](img/12_loadtest_app_sin_cluster_api_500000000.png)

Resultados de `loadtest` sobre la aplicación, ahora con cluster y con una carga no tan grande.

![Loadtest cluster 500k](img/13_loadtest_app_cluster_api_500000.png)

Resultados de `loadtest` sobre la aplicación, siguiendo con cluster y una carga más grande.

![Loadtest cluster 500M](img/14_loadtest_app_cluster_api_500000000.png)

Los resultados muestran una reducción del tiempo total y de la latencia media al utilizar cluster, así como un incremento en las peticiones por segundo efectivas.

## 6. Gestión de la aplicación con PM2

Instalación del gestor de procesos PM2 de forma global.

![Instalación PM2](img/15_instalacion_pm2.png)

Ejecución de la aplicación sin cluster utilizando PM2 en modo cluster automático.

![PM2 ejecución directa](img/16_ejecucion_app_sin_cluster_pm2.png)

Definición del archivo `ecosystem.config.js` para configurar la ejecución en modo cluster.

![PM2 ecosystem](img/17_pm2_ecosystem_config.png)

Ejecución de la aplicación usando PM2 y el archivo de configuración.

![PM2 con config](img/18_ejecucion_app_sin_cluster_pm2_con_config.png)

## 7. Explicación de comandos PM2

* **pm2 ls**: muestra el listado de procesos gestionados por PM2, indicando estado, consumo de CPU y memoria.

![pm2 ls](img/19_pm2_ls.png)

* **pm2 logs**: permite visualizar en tiempo real los registros de salida estándar y errores de las aplicaciones.

![pm2 logs](img/20_pm2_logs.png)
  
* **pm2 monit**: ofrece una interfaz interactiva para monitorizar el rendimiento de las aplicaciones.

![pm2 monit](img/21_pm2_monit.png)

## 8. Discusión: ¿Por qué a veces la app sin cluster puede rendir mejor?

En las imágenes, se observa que cuando la carga de trabajo es muy baja o nula, la aplicación sin clúster responde ligeramente más rápido. Esto ocurre porque el proceso maestro del clúster actúa como un "intermediario" que debe recibir la conexión y decidir a qué trabajador (worker) enviársela. En un escenario en el que se hacen peticiones más pequeñas, la aplicación sin Cluster supera a la aplicación con Cluster ya que no tiene que gestionar todo lo relacionado con los procesos (creación, distribución de la carga, comunicación entre procesos, etc).
  
Además, el sistema operativo debe gestionar la memoria de varios procesos a la vez en el modo clúster. Si la tarea es tan simple que no llega a saturar un núcleo, tener otros 3 o 4 núcleos "encendidos" y vigilados por el maestro genera un gasto de recursos innecesario (overhead) que empeora las métricas frente a la sencillez de un solo hilo trabajando sin distracciones.
