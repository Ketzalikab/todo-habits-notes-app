# todo-habits-notes-app
📘 Proyecto: Ejercicio de Aprendizaje en Docker
Este proyecto es un ejercicio para profundizar en el uso de Docker para crear, administrar y desplegar contenedores. La aplicación incluye una arquitectura de frontend, backend y base de datos con MongoDB, gestionados mediante Docker Compose.

# 1. Objetivo del Proyecto
Este proyecto tiene como propósito aprender a:

- Configurar contenedores con Docker para servicios de backend, frontend y base de datos.
- Persistir datos con volúmenes de Docker en MongoDB.
- Administrar y ejecutar múltiples contenedores con Docker Compose.
- Resolver problemas comunes en la conexión y gestión de contenedores.

# 2. Estructura del Proyecto
La aplicación está compuesta por:

- **Backend**: Servidor construido con Node.js y Express.
- **Frontend**: Aplicacion React. 
- **Base de Datos**: MongoDB con volúmenes para persistencia de datos.

Cada servicio está definido en un archivo docker-compose.yml para gestionarlos como contenedores interdependientes.

# 3. Configuración y Archivos Clave
Dockerfile del Backend
Explica cómo el Dockerfile en el backend se construye a partir de una imagen de Node y configura el entorno de Express.

# Docker Compose
El archivo docker-compose.yml une los servicios y define la red y volúmenes:

- Servicios: Backend, frontend y MongoDB.
- Redes: Para la comunicación entre contenedores.
- Volúmenes: Para la persistencia de datos de MongoDB.

# Archivo docker-compose.yml:

yml
Copiar código
version: "3.8"
services:
  app:
    build: ./server
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    networks:
      - app-network
  
  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network
      
  frontend: 
    build:
      context: ./client 
    ports:
      - "3000:80"
    networks:
      - app-network

volumes:
  mongo-data:

networks:
  app-network:

# 4. Proceso de Implementación
Describe los pasos para correr el proyecto y las lecciones aprendidas en cada etapa.

Paso 1: Crear y Construir Contenedores
Comando: docker-compose up --build
Lección: Aquí se aprendió cómo Docker Compose ayuda a orquestar múltiples servicios.
Paso 2: Conexión a MongoDB desde el Contenedor de la Aplicación
Comando: docker exec -it <mongo-container> mongosh
Lección: Se solucionaron problemas de conexión y se aprendió a depurar con docker exec.
Paso 3: Persistencia de Datos con Volúmenes
Explicación: El volumen mongo-data permite que la información en MongoDB persista entre reinicios.
Lección: Los volúmenes son esenciales para manejar datos en bases de datos contenedorizadas.

# 5. Capturas del Proceso
Incluye capturas de pantalla que muestren cada paso importante, como:

La ejecución de los contenedores.
La conexión exitosa a MongoDB.
La aplicación en funcionamiento en localhost.

# 6. Retos y Soluciones
Esta sección detalla algunos de los problemas que se resolvieron, como:

Problema de conexión con MongoDB: Se solucionó utilizando mongosh y revisando las redes.
Configuración del Volumen: Aprendí cómo usar volúmenes para que la base de datos MongoDB persista.

# 7. Reflexiones y Próximos Pasos
Este proyecto me enseñó los conceptos fundamentales para gestionar aplicaciones con Docker. Los próximos pasos son:

Profundizar en la seguridad de Docker.
Optimizar el tamaño de las imágenes.
Implementar variables de entorno.