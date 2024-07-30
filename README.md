
# Registro de Perros en Adopción

El proyecto "Registro de Perros en Adopción" es una aplicación web diseñada para facilitar la gestión y visualización de perros disponibles para adopción. Esta aplicación permite a los usuarios ver detalles de los perros, buscar perros por nombre, añadir nuevos perros al registro, listar todos los perros, listar los 20 perros más jóvenes, paginar los resultados de la lista de perros y eliminar registros de perros específicos.

## Características Principales

- **Interfaz de Usuario Intuitiva**: La interfaz de usuario está diseñada con HTML, CSS y JavaScript, ofreciendo una experiencia de usuario clara y fácil de usar.
- **API REST Completa**: La aplicación expone una API RESTful bien documentada con Swagger, que permite a las protectoras de animales y otros desarrolladores interactuar con el sistema de manera programática.
- **Base de Datos en Memoria**: Utiliza H2, una base de datos en memoria, para almacenamiento temporal de los datos, lo que facilita las pruebas y el desarrollo.
- **Gestión de Perros**: Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los registros de perros, además de búsquedas específicas por nombre y paginación de resultados.
- **Gestión de Propietarios**: Permite la asociación de un propietario a cada perro, facilitando la gestión de la información.
- **Documentación API con Swagger**: Incluye documentación de la API generada automáticamente con Swagger, accesible a través de una interfaz gráfica.

## Tecnologías Utilizadas

- **Java y Spring Boot**: El backend de la aplicación está construido con Spring Boot, un marco de trabajo robusto que simplifica el desarrollo de aplicaciones Java.
- **H2 Database**: Para el almacenamiento de datos en memoria, facilitando el desarrollo y las pruebas sin necesidad de configurar una base de datos externa.
- **Spring Data JPA**: Para la gestión de la persistencia y las operaciones CRUD de manera simplificada y eficiente.
- **Swagger**: Para la documentación de la API, proporcionando una interfaz interactiva para explorar y probar los endpoints de la API.
- **HTML, CSS y JavaScript**: Para la creación de la interfaz de usuario, asegurando una experiencia interactiva y moderna.

## Arquitectura del Sistema

El sistema sigue una arquitectura MVC (Modelo-Vista-Controlador):

- **Modelo**: Representado por las entidades JPA que definen la estructura de los datos.
- **Vista**: Implementada con archivos HTML estáticos y estilos CSS, con interacción mejorada mediante JavaScript.
- **Controlador**: Los controladores Spring manejan las solicitudes HTTP, procesan los datos a través de servicios y devuelven las respuestas adecuadas.

## Funcionamiento

- **Inicio de la Aplicación**: Al iniciar la aplicación, Spring Boot configura automáticamente el entorno y carga el esquema y los datos iniciales en la base de datos H2.
- **Interacción del Usuario**: Los usuarios pueden interactuar con la aplicación a través de la interfaz web, realizando búsquedas, añadiendo nuevos registros de perros, eliminando registros y viendo listas paginadas de perros.
- **API REST**: Las protectoras de animales y otros desarrolladores pueden utilizar la API REST documentada para integrar la funcionalidad de la aplicación en sus propios sistemas.

## Objetivos del Proyecto

El objetivo principal de este proyecto es proporcionar una herramienta efectiva y fácil de usar para la gestión de perros en adopción, facilitando tanto la administración por parte de las protectoras de animales como el acceso a la información por parte de posibles adoptantes. Al ofrecer tanto una interfaz gráfica para usuarios finales como una API para desarrolladores, el sistema busca ser versátil y adaptable a diversas necesidades.

## Estructura del Proyecto

- **src/main/java/io/keepcoding/registro_perros_adopcion**: Contiene el código fuente de la aplicación.
  - **controller**: Controladores REST para manejar las solicitudes HTTP.
  - **model**: Entidades JPA.
  - **repository**: Repositorios JPA para interactuar con la base de datos.
  - **service**: Servicios de negocio.
  - **config**: Configuraciones de Swagger.
  - **web**: Controladores para manejar las vistas.
- **src/main/resources/static**: Contiene los archivos estáticos como imágenes, hojas de estilo y scripts de JavaScript.
- **src/main/resources**: Contiene archivos de configuración y datos de la base de datos.

### Configuración de la Base de Datos

El archivo `application.properties` está configurado para usar H2 como base de datos en memoria:

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
```
### Dependencias

El archivo `pom.xml` incluye las siguientes dependencias principales:

- Spring Boot Starter Web
- Spring Boot DevTools
- Lombok
- Spring Boot Starter Test
- Spring Boot Starter Validation
- H2 Database
- Spring Boot Starter Data JPA
- Springfox Swagger2
- Springfox Swagger UI


### Esquema y Datos de Prueba

El esquema de la base de datos se define en `schema.sql`:

```
CREATE TABLE propietario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE perro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_nac DATE NOT NULL,
    raza VARCHAR(255) NOT NULL,
    peso DOUBLE NOT NULL,
    tiene_chip BOOLEAN NOT NULL,
    url_foto VARCHAR(255) NOT NULL,
    propietario_id BIGINT,
    FOREIGN KEY (propietario_id) REFERENCES propietario(id)
);
```

Los datos de prueba se insertan mediante `data.sql` aquí un ejemplo:

```sql
INSERT INTO propietario (nombre) VALUES ('Juan Pérez');

INSERT INTO perro (nombre, fecha_nac, raza, peso, tiene_chip, url_foto, propietario_id) VALUES
('Fido', '2020-01-01', 'Labrador', 30.0, true, '/images/fido.jpg', 1),
('Luna', '2019-05-05', 'Beagle', 20.0, false, '/images/luna.jpg', 2),
('Max', '2018-08-08', 'Bulldog', 25.0, true, '/images/max.jpg', 1),
('Bella', '2021-03-03', 'Poodle', 10.0, false, '/images/bella.jpg', 3),
('Rocky', '2017-07-07', 'Pastor Alemán', 35.0, true, '/images/rocky.jpg', NULL),
('Tank', '2021-12-12', 'Newfoundland', 70.0, true, '/images/tank.jpg', NULL);
```

## Ejecución

Para ejecutar la aplicación, usa el siguiente comando en la raíz del proyecto:

```sh
mvn spring-boot:run
```

## Uso

### Interfaz de Usuario

La interfaz de usuario está disponible en `http://localhost:8080` y se puede acceder con cualquier navegador después de iniciar la aplicación.

### API REST

La API REST está documentada con Swagger y puede ser accedida en:

```
http://localhost:8080/swagger-ui.html
```

### Endpoints de la API

- **GET /api/perros/{id}**: Obtiene los detalles de un perro por su ID, incluyendo la información del propietario.
- **GET /api/perros/nombre/{nombre}**: Busca perros por nombre.
- **POST /api/perros**: Crea un nuevo registro de perro, incluyendo la información del propietario.
- **GET /api/perros**: Lista todos los perros.
- **GET /api/perros/youngest**: Lista los 20 perros más jóvenes.
- **GET /api/perros/page?page={page}**: Lista los perros en formato paginado.
- **DELETE /api/perros/{id}**: Elimina un perro por su ID.
