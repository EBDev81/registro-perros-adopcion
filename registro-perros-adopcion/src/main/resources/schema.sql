CREATE TABLE propietario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE perro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_nac DATE NOT NULL,
    raza VARCHAR(255) NOT NULL,
    peso DOUBLE NOT NULL,
    tiene_chip BOOLEAN NOT NULL,
    url_foto VARCHAR(255) NOT NULL,
    propietario_id INT,
    FOREIGN KEY (propietario_id) REFERENCES propietario(id)
);