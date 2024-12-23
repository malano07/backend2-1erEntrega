const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const loadProducts = document.getElementById('loadProducts');
const productList = document.getElementById('product-list');
const responseDiv = document.getElementById('response');


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, age, password }),
        });
        const data = await response.text();
        responseDiv.textContent = data;
    } catch (error) {
        responseDiv.textContent = 'Error al registrar usuario';
    }
});


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.text();
        responseDiv.textContent = data;
    } catch (error) {
        responseDiv.textContent = 'Error al iniciar sesión';
    }
});


loadProducts.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        if (!products || products.length === 0) {
            productList.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        productList.innerHTML = ''; 

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        responseDiv.textContent = 'Error al cargar productos';
    }
});
