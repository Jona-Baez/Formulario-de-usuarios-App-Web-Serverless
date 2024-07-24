document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
        Nombres: formData.get('name'),
        Apellidos: formData.get('lastName'),
        Inicio_mensualidad: formData.get('start_monthly'),
        Fin_mensualidad: formData.get('end_monthly')
    };
    if (confirm('¿Estás seguro de que deseas crear este usuario?')) {
        try {
            //const createResponse = await fetch('Endpoint-del-API/create_user', {
            const createResponse = await fetch('https://tx94oh0z53.execute-api.us-east-1.amazonaws.com/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (createResponse.ok) {
                document.getElementById('confirmationMessage').style.display = 'block';
                document.getElementById('errorMessage').style.display = 'none';
                 setTimeout(() => {
                                window.location.reload();
                            }, 2000);
            } else {
                throw new Error('Error al crear el usuario.');
            }
        } catch (error) {
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('confirmationMessage').style.display = 'none';
        }
    }

});


/*

*/