# Práctica: Uso de Cluster y PM2 en Node.js

## 1. Introducción

En esta práctica se analiza el impacto del uso de **cluster** en aplicaciones Node.js intensivas en CPU, así como el uso del gestor de procesos **PM2** para mejorar la disponibilidad y el rendimiento. Para ello se implementa una API sencilla con y sin cluster, se somete a pruebas de carga con `loadtest` y se comparan los resultados obtenidos.

## 2. Objetivos

* Desplegar una aplicación Node.js sin uso de cluster.
* Implementar la misma aplicación utilizando el módulo `cluster`.
* Evaluar el rendimiento mediante pruebas de carga.
* Gestionar la aplicación con PM2 en modo cluster.
* Analizar y comparar los resultados obtenidos.

## 3. Preparación del entorno

**Figura 1.** Inicialización del proyecto Node.js e instalación del framework Express mediante npm.

![Inicialización npm y Express](img/01_inicializar_npm_y_instalar_express.png)

**Figura 2.** Creación del archivo `app_sin_cluster.js`, que implementa la aplicación Node.js sin uso de cluster.

![Creación app sin cluster](img/02_creacion_archivo_app_sin_cluster.png)

## 4. Aplicación sin cluster

**Figura 3.** Despliegue de la aplicación sin cluster utilizando el comando `node app_sin_cluster.js`.

![Despliegue app sin cluster](img/08_despliegue_node_app_sin_cluster.png)

**Figura 4.** Acceso correcto a la ruta raíz (`/`) de la aplicación sin cluster desde el navegador.

![Acceso root sin cluster](img/04_acceso_app_sin_cluster_root.png)

**Figura 5.** Acceso a la ruta `/api/50`, comprobando el funcionamiento correcto del endpoint.

![Acceso API 50 sin cluster](img/05_acceso_app_sin_cluster_api_50.png)

**Figura 6.** Acceso a la ruta `/api/50000000000` mostrando el tiempo de respuesta en la primera medición.

![API grande tiempo 1](img/06_acceso_app_sin_cluster_api_50000000000_con_metrica_de_tiempo_1o.png)

**Figura 7.** Segunda medición del tiempo de respuesta para la misma petición, evidenciando una alta latencia.

![API grande tiempo 2](img/07_acceso_app_sin_cluster_api_50000000000_con_metrica_de_tiempo_2o.png)

## 5. Aplicación con cluster

**Figura 8.** Despliegue de la aplicación con cluster, donde se crean múltiples workers según los núcleos de la CPU.

![Despliegue app cluster](img/03_despliegue_node_app_cluster.png)

**Figura 9.** Primera medición del tiempo de respuesta accediendo a `/api/50000000000` con la aplicación en modo cluster.

![Cluster tiempo 1](img/09_acceso_app_cluster_api_50000000000_con_metrica_de_tiempo_1o.png)

**Figura 10.** Segunda medición del tiempo de respuesta, observándose una mejora respecto a la versión sin cluster.

![Cluster tiempo 2](img/10_acceso_app_cluster_api_50000000000_con_metrica_de_tiempo_2o.png)

## 6. Pruebas de carga con Loadtest

**Figura 11.** Resultados de `loadtest` sobre la aplicación sin cluster con una carga moderada.

![Loadtest sin cluster 500k](img/11_loadtest_app_sin_cluster_api_500000.png)

**Figura 12.** Resultados de `loadtest` sobre la aplicación sin cluster con una carga intensiva.

![Loadtest sin cluster 500M](img/12_loadtest_app_sin_cluster_api_500000000.png)

**Figura 13.** Resultados de `loadtest` sobre la aplicación con cluster bajo carga moderada.

![Loadtest cluster 500k](img/13_loadtest_app_cluster_api_500000.png)

**Figura 14.** Resultados de `loadtest` sobre la aplicación con cluster bajo carga intensiva.

![Loadtest cluster 500M](img/14_loadtest_app_cluster_api_500000000.png)

Los resultados muestran una reducción del tiempo total y de la latencia media al utilizar cluster, así como un incremento en las peticiones por segundo efectivas.

## 7. Gestión de la aplicación con PM2

**Figura 15.** Instalación del gestor de procesos PM2 de forma global.

![Instalación PM2](img/15_instalacion_pm2.png)

**Figura 16.** Ejecución de la aplicación sin cluster utilizando PM2 en modo cluster automático.

![PM2 ejecución directa](img/16_ejecucion_app_sin_cluster_pm2.png)

**Figura 17.** Definición del archivo `ecosystem.config.js` para configurar la ejecución en modo cluster.

![PM2 ecosystem](img/17_pm2_ecosystem_config.png)

**Figura 18.** Ejecución de la aplicación usando PM2 y el archivo de configuración.

![PM2 con config](img/18_ejecucion_app_sin_cluster_pm2_con_config.png)

**Figura 19.** Salida del comando `pm2 ls`, mostrando los procesos gestionados y su estado.

![pm2 ls](img/19_pm2_ls.png)

**Figura 20.** Visualización de los logs de la aplicación mediante `pm2 logs`.

![pm2 logs](img/20_pm2_logs.png)

**Figura 21.** Monitorización en tiempo real del uso de CPU y memoria con `pm2 monit`.

![pm2 monit](img/21_pm2_monit.png)

## 8. Explicación de comandos PM2

* **pm2 ls**: muestra el listado de procesos gestionados por PM2, indicando estado, consumo de CPU y memoria.
* **pm2 logs**: permite visualizar en tiempo real los registros de salida estándar y errores de las aplicaciones.
* **pm2 monit**: ofrece una interfaz interactiva para monitorizar el rendimiento de las aplicaciones.

## 9. Discusión: ¿Por qué a veces la app sin cluster puede rendir mejor?

En determinadas ejecuciones la aplicación sin cluster puede mostrar mejores resultados debido a:

* Sobrecoste de creación y gestión de múltiples procesos.
* Variabilidad en las pruebas y en el estado del sistema.
* Número limitado de clientes concurrentes.
* Efectos de caché y calentamiento del motor JavaScript.

Por ello, es recomendable realizar varias ejecuciones y analizar métricas agregadas antes de extraer conclusiones definitivas.

## 10. Conclusiones

El uso de **cluster** y **PM2** permite aprovechar mejor los recursos de CPU en aplicaciones Node.js intensivas, mejorando el rendimiento y la escalabilidad. PM2 añade además facilidad de gestión, monitorización y tolerancia a fallos, siendo una solución recomendable para entornos de producción.
