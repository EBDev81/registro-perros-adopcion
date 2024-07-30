document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/perros')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tabla-perros tbody');
            tbody.innerHTML = '';
            data.forEach(perro => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${perro.id}</td>
                    <td>${perro.nombre}</td>
                    <td>${perro.raza}</td>
                    <td>${perro.peso}</td>
                    <td>${perro.tiene_chip ? 'Sí' : 'No'}</td>
                    <td><img src="${perro.urlFoto}" alt="${perro.nombre}"></td>
                    <td>${perro.propietario && typeof perro.propietario === 'object' ? perro.propietario.nombre : 'Sin propietario'}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
});
