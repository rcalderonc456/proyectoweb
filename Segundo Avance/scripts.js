document.addEventListener('DOMContentLoaded', () => {
    const providerForm = document.getElementById('provider-form');
    const providerList = document.querySelector('#provider-list tbody');

    // Cargar proveedores al inicio
    fetchProviders();

    providerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/api/proveedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, contact, phone, email })
            });

            const newProvider = await response.json();
            addProviderToTable(newProvider);
            providerForm.reset();
        } catch (error) {
            console.error('Error al agregar proveedor:', error);
        }
    });

    async function fetchProviders() {
        try {
            const response = await fetch('http://localhost:3000/api/proveedores');
            const providers = await response.json();
            providers.forEach(provider => addProviderToTable(provider));
        } catch (error) {
            console.error('Error al cargar proveedores:', error);
        }
    }

    function addProviderToTable(provider) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${provider.name}</td>
            <td>${provider.contact}</td>
            <td>${provider.phone}</td>
            <td>${provider.email}</td>
            <td><button class="delete-btn" data-id="${provider._id}">Eliminar</button></td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            try {
                await fetch(`http://localhost:3000/api/proveedores/${id}`, {
                    method: 'DELETE'
                });
                e.target.closest('tr').remove();
            } catch (error) {
                console.error('Error al eliminar proveedor:', error);
            }
        });

        providerList.appendChild(row);
    }
});
