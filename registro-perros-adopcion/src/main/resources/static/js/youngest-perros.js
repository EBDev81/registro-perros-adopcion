const baseUrl = "/api/perros/youngest-perros";

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

function displayResults(container, perros) {
    container.innerHTML = '';
    if (perros.length === 0) {
        container.innerHTML = '<p>No se encontraron perros</p>';
    } else {
        perros.forEach(perro => {
            container.appendChild(createPerroCard(perro));
        });
    }
}

// Listar los 20 Perros Más Jóvenes
fetch(baseUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json();
    })
    .then(data => {
        displayResults(document.getElementById("youngestPerrosResult"), data);
    })
    .catch(error => {
        console.error('Error al listar los perros más jóvenes:', error);
        const container = document.getElementById("youngestPerrosResult");
        container.innerHTML = '<p>Error al cargar los datos.</p>';
    });
