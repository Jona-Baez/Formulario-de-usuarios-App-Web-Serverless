window.onload = async function() {
    try {
        // Realizar una solicitud para obtener los registros de la tabla "users"
        //const response = await fetch('Endpoint-del-API/get_user');
        const response = await fetch('https://tx94oh0z53.execute-api.us-east-1.amazonaws.com/get_user');
        const data = await response.json();

        // Obtener el elemento de selección de usuarios
        const userSelect = document.getElementById('userSelect');

        // Iterar sobre los registros y agregar opciones al elemento de selección
        data.forEach(user => {
            const option = document.createElement('option');
            option.textContent = user.Nombres + ' ' + user.Apellidos; // Modificar según la estructura de tus datos
            option.value = user.id; // Ajustar según la estructura de tus datos
            option.dataset.details = JSON.stringify(user); // Guardar detalles en data attribute
            userSelect.appendChild(option);
        });

        // Agregar event listener para manejar cambios en la selección
        userSelect.addEventListener('change', function() {
            const selectedOption = userSelect.options[userSelect.selectedIndex];
            const userDetails = JSON.parse(selectedOption.dataset.details);

            // Obtener el tbody de la tabla
            const detailsBody = document.getElementById('detailsBody');
            detailsBody.innerHTML = ''; // Limpiar detalles anteriores

            // Crear una fila con los detalles del usuario
            const row = document.createElement('tr');

            const idCell = document.createElement('th');
            idCell.scope = 'row';
            idCell.textContent = userDetails.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = userDetails.Nombres;

            const surnameCell = document.createElement('td');
            surnameCell.textContent = userDetails.Apellidos;

            const startMonthlyCell = document.createElement('td');
            startMonthlyCell.textContent = userDetails.Inicio_mensualidad;

            const endMonthlyCell = document.createElement('td');
            endMonthlyCell.textContent = userDetails.Fin_mensualidad;

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(surnameCell);
            row.appendChild(startMonthlyCell);
            row.appendChild(endMonthlyCell);

            detailsBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los registros de los usuarios:', error);
        alert('Ocurrió un error al obtener los registros de los usuarios. Por favor, inténtalo de nuevo más tarde.');
    }
};
