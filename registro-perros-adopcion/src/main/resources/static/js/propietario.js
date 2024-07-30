document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = "/api/propietarios";

    function preventFormSubmit(form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
        });
    }

    function createPropietarioCard(propietario) {
        const card = document.createElement('div');
        card.className = 'propietario-card';

        const name = document.createElement('h3');
        name.textContent = propietario.nombre;

        card.appendChild(name);

        return card;
    }

    function displayResults(container, propietarios) {
        container.innerHTML = '';
        if (propietarios.length === 0) {
            container.innerHTML = '<p>Propietario no encontrado en la base de datos</p>';
        } else {
            propietarios.forEach(propietario => {
                container.appendChild(createPropietarioCard(propietario));
            });
        }
    }

    // Mostrar Propietario por ID
    const getByIdForm = document.getElementById("getByIdForm");
    preventFormSubmit(getByIdForm);
    getByIdForm.addEventListener("submit", function() {
        const propietarioId = document.getElementById("propietarioId").value;
        fetch(`${baseUrl}/${propietarioId}`)
            .then(response => response.json())
            .then(data => {
                displayResults(document.getElementById("propietarioByIdResult"), [data]);
            })
            .catch(() => {
                displayResults(document.getElementById("propietarioByIdResult"), []);
            });
    });

    // Subir un Propietario
    const createPropietarioForm = document.getElementById("createPropietarioForm");
    preventFormSubmit(createPropietarioForm);
    createPropietarioForm.addEventListener("submit", function() {
        const propietario = {
            nombre: document.getElementById("nombre").value
        };
        fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propietario)
        })
        .then(response => response.json())
        .then(data => {
            displayResults(document.getElementById("createPropietarioResult"), [data]);
        });
    });

    // Listar Todos los Propietarios
    document.getElementById("listAllPropietariosBtn").addEventListener("click", function() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                displayResults(document.getElementById("listAllPropietariosResult"), data);
            });
    });

    // Borrar un Propietario
    const deletePropietarioForm = document.getElementById("deletePropietarioForm");
    preventFormSubmit(deletePropietarioForm);
    deletePropietarioForm.addEventListener("submit", function() {
        const propietarioId = document.getElementById("deletePropietarioId").value;
        fetch(`${baseUrl}/${propietarioId}`, {
            method: "DELETE"
        })
        .then(() => {
            document.getElementById("deletePropietarioResult").innerText = `Propietario con ID ${propietarioId} borrado.`;
        });
    });
});
