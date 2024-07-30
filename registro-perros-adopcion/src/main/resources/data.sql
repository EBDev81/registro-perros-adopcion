-- Insertar propietarios
INSERT INTO propietario (nombre) VALUES ('Aitor Menta');
INSERT INTO propietario (nombre) VALUES ('Dolores Fuertes');
INSERT INTO propietario (nombre) VALUES ('Jose Maforo');

-- Insertar perros
INSERT INTO perro (nombre, fecha_nac, raza, peso, tiene_chip, url_foto, propietario_id) VALUES
('Fido', '2020-01-01', 'Labrador', 30.0, true, '/images/fido.jpg', 1),
('Rex', '2019-05-15', 'Pastor Alemán', 35.0, true, '/images/rex.jpg', 1),
('Luna', '2021-02-20', 'Golden Retriever', 25.0, false, '/images/luna.jpg', 2),
('Max', '2022-11-11', 'Bulldog', 20.0, true, '/images/max.jpg', 2),
('Bella', '2021-07-23', 'Beagle', 18.0, false, '/images/bella.jpg', 3),
('Rocky', '2021-03-01', 'Boxer', 28.0, true, '/images/rocky.jpg', NULL),
('Duke', '2020-08-30', 'Dachshund', 12.0, true, '/images/duke.jpg', NULL),
('Milo', '2021-01-14', 'Poodle', 15.0, false, '/images/milo.jpg', NULL),
('Zoe', '2020-10-10', 'Rottweiler', 45.0, true, '/images/zoe.jpg', NULL),
('Buster', '2019-12-05', 'Shih Tzu', 10.0, false, '/images/buster.jpg', NULL),
('Bailey', '2022-03-21', 'Cocker Spaniel', 22.0, true, '/images/bailey.jpg', NULL),
('Coco', '2020-11-19', 'Chihuahua', 6.0, true, '/images/coco.jpg', NULL),
('Charlie', '2021-05-18', 'Doberman', 40.0, false, '/images/charlie.jpg', NULL),
('Oscar', '2021-06-11', 'Great Dane', 50.0, true, '/images/oscar.jpg', NULL),
('Sam', '2021-09-12', 'Siberian Husky', 30.0, true, '/images/sam.jpg', NULL),
('Jake', '2020-12-01', 'Dalmatian', 32.0, true, '/images/jake.jpg', NULL),
('Sadie', '2021-11-22', 'Border Collie', 23.0, false, '/images/sadie.jpg', NULL),
('Toby', '2019-07-15', 'Shiba Inu', 20.0, true, '/images/toby.jpg', NULL),
('Gizmo', '2020-04-20', 'Pug', 8.0, false, '/images/gizmo.jpg', NULL),
('Harley', '2020-06-30', 'Mastiff', 55.0, true, '/images/harley.jpg', NULL),
('Riley', '2021-01-25', 'Bichon Frise', 7.0, true, '/images/riley.jpg', NULL),
('Maggie', '2019-10-10', 'Saint Bernard', 65.0, true, '/images/maggie.jpg', NULL),
('Murphy', '2020-07-07', 'Vizsla', 27.0, true, '/images/murphy.jpg', NULL),
('Zeus', '2021-04-04', 'Pit Bull', 35.0, false, '/images/zeus.jpg', NULL),
('Loki', '2020-05-20', 'Weimaraner', 30.0, true, '/images/loki.jpg', NULL),
('Apollo', '2019-03-14', 'Akita', 40.0, true, '/images/apollo.jpg', NULL),
('Thor', '2022-02-28', 'Jack Russell', 15.0, false, '/images/thor.jpg', NULL),
('Bruno', '2021-08-10', 'Australian Shepherd', 25.0, true, '/images/bruno.jpg', NULL),
('Rusty', '2020-09-09', 'Pomeranian', 5.0, false, '/images/rusty.jpg', NULL),
('Tank', '2021-12-12', 'Newfoundland', 70.0, true, '/images/tank.jpg', NULL);
