document.addEventListener("DOMContentLoaded", function() {
    // Base URL para todas las peticiones a la API
    const baseUrl = "/api/perros";

    // Función para prevenir el envío predeterminado de formularios
    function preventFormSubmit(form) {
        if (form) {
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                console.log("Form submission prevented for form:", form.id);
            });
        } else {
            console.error("Formulario no encontrado:", form);
        }
    }

    // Función para crear una tarjeta de presentación de un perro
    function createPerroCard(perro) {
        const card = document.createElement('div');
        card.className = 'perro-card';

        const name = document.createElement('h3');
        name.textContent = perro.nombre;

        const img = document.createElement('img');
        img.src = perro.urlFoto;
        img.alt = perro.nombre;

        const details = document.createElement('p');
        details.innerHTML = `
            <strong>Raza:</strong> ${perro.raza}<br>
            <strong>Fecha de Nacimiento:</strong> ${new Date(perro.fechaNac).toLocaleDateString()}<br>
            <strong>Peso:</strong> ${perro.peso} kg<br>
            <strong>Tiene Chip:</strong> ${perro.tiene_chip ? 'Sí' : 'No'}
        `;

        if (perro.propietario && typeof perro.propietario === 'object') {
            details.innerHTML += `<br><strong>Propietario:</strong> ${perro.propietario.nombre}`;
        } else {
            details.innerHTML += `<br><strong>Propietario:</strong> No asignado`;
        }

        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(details);

        return card;
    }

    // Función para mostrar los resultados de perros en un contenedor específico
    function displayResults(container, perros, isPaged = false) {
        console.log('Displaying results:', perros);
        container.innerHTML = '';
        if (perros.length === 0) {
            container.innerHTML = isPaged ? '<p>No hay perros en la página solicitada</p>' : '<p>Perro no encontrado en la base de datos</p>';
        } else {
            perros.forEach(perro => {
                container.appendChild(createPerroCard(perro));
            });
        }
    }

    // Manejo del formulario para mostrar perros en páginas de 5
    const getPerrosPagedForm = document.getElementById("getPerrosPagedForm");
    if (getPerrosPagedForm) {
        preventFormSubmit(getPerrosPagedForm);
        getPerrosPagedForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const page = document.getElementById("page").value;
            console.log('Fetching page:', page);
            fetch(`${baseUrl}/page?page=${page}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.content) {
                        displayResults(document.getElementById("perrosPagedResult"), data.content, true);
                    } else {
                        displayResults(document.getElementById("perrosPagedResult"), [], true);
                    }
                })
                .catch(error => {
                    console.error('Error al obtener perros paginados:', error);
                    displayResults(document.getElementById("perrosPagedResult"), [], true);
                });
        });
    } else {
        console.error("Formulario 'getPerrosPagedForm' no encontrado.");
    }

    // Manejo del formulario para mostrar un perro por ID
    const getByIdForm = document.getElementById("getByIdForm");
    if (getByIdForm) {
        preventFormSubmit(getByIdForm);
        getByIdForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const perroId = document.getElementById("perroId").value;
            fetch(`${baseUrl}/${perroId}`)
                .then(response => response.json())
                .then(data => {
                    displayResults(document.getElementById("perroByIdResult"), [data]);
                })
                .catch(() => {
                    displayResults(document.getElementById("perroByIdResult"), []);
                });
        });
    } else {
        console.error("Formulario 'getByIdForm' no encontrado.");
    }

    // Manejo del formulario para mostrar un perro por nombre
    const getByNameForm = document.getElementById("getByNameForm");
    if (getByNameForm) {
        preventFormSubmit(getByNameForm);
        getByNameForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const perroNombre = document.getElementById("perroNombre").value;
            fetch(`${baseUrl}/nombre/${perroNombre}`)
                .then(response => response.json())
                .then(data => {
                    displayResults(document.getElementById("perroByNameResult"), data);
                })
                .catch(() => {
                    displayResults(document.getElementById("perroByNameResult"), []);
                });
        });
    } else {
        console.error("Formulario 'getByNameForm' no encontrado.");
    }

    // Manejo del formulario para subir un nuevo perro
    const createPerroForm = document.getElementById("createPerroForm");
    if (createPerroForm) {
        preventFormSubmit(createPerroForm);
        createPerroForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const propietario_id = document.getElementById("propietario_id").value;
            const perro = {
                nombre: document.getElementById("nombre").value,
                fechaNac: document.getElementById("fechaNac").value,
                raza: document.getElementById("raza").value,
                peso: document.getElementById("peso").value,
                tiene_chip: document.getElementById("tiene_chip").checked,
                urlFoto: document.getElementById("urlFoto").value,
                propietario: propietario_id ? { id: propietario_id } : null
            };

            fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(perro)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en la creación del perro');
                    }
                })
                .then(data => {
                    let messageDiv = document.getElementById('createPerroResult');
                    if (data.id) {
                        messageDiv.textContent = 'Perro dado de alta con éxito';
                        messageDiv.className = 'success';
                    } else {
                        messageDiv.textContent = 'Error al dar de alta al perro';
                        messageDiv.className = 'error';
                    }
                })
                .catch(() => {
                    let messageDiv = document.getElementById('createPerroResult');
                    messageDiv.textContent = 'Error al dar de alta al perro';
                    messageDiv.className = 'error';
                });
        });
    } else {
        console.error("Formulario 'createPerroForm' no encontrado.");
    }

    // Manejo del botón para listar todos los perros
    const listAllPerrosBtn = document.getElementById("listAllPerrosBtn");
    if (listAllPerrosBtn) {
        listAllPerrosBtn.addEventListener("click", function() {
            fetch(baseUrl)
                .then(response => response.json())
                .then(data => {
                    displayResults(document.getElementById("listAllPerrosResult"), data);
                });
        });
    } else {
        console.error("Botón 'listAllPerrosBtn' no encontrado.");
    }

    // Manejo del botón para listar los 20 perros más jóvenes
    const listYoungestPerrosBtn = document.getElementById("listYoungestPerrosBtn");
    if (listYoungestPerrosBtn) {
        listYoungestPerrosBtn.addEventListener("click", function() {
            fetch(`${baseUrl}/youngest`)
                .then(response => response.json())
                .then(data => {
                    displayResults(document.getElementById("listYoungestPerrosResult"), data);
                });
        });
    } else {
        console.error("Botón 'listYoungestPerrosBtn' no encontrado.");
    }

    // Manejo del formulario para borrar un perro
    const deletePerroForm = document.getElementById("deletePerroForm");
    if (deletePerroForm) {
        preventFormSubmit(deletePerroForm);
        deletePerroForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const perroId = document.getElementById("deletePerroId").value;
            fetch(`${baseUrl}/${perroId}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById("deletePerroResult").innerText = `Perro con ID ${perroId} borrado exitosamente.`;
                } else {
                    throw new Error('Error al borrar el perro');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("deletePerroResult").innerText = `Error al intentar borrar el perro con ID ${perroId}.`;
            });
        });
    } else {
        console.error("Formulario 'deletePerroForm' no encontrado.");
    }
});
