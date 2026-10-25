document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Iwasan mag-refresh ang buong page

    // Kunin ang mga value galing sa input fields ng Admin Dashboard
    const newProduct = {
        name: document.getElementById('productName').value,
        category: document.getElementById('categorySelect').value,
        price: document.getElementById('priceInput').value,
        stock: document.getElementById('stockInput').value,
        image: document.getElementById('imageInput').value
    };

    try {
        // Diretsong tatama sa POST /api/products endpoint na nasa server.js mo
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // "Product added successfully" galing sa backend mo!
            document.getElementById('addProductForm').reset(); // Linisin ang form
            
            // 💡 ANG SUSING BAHAGI: Tawagin agad itong function para kusa niyang 
            // i-fetch ang updated list ng products at lumabas sa website catalog mo!
            loadProductsCatalog(); 
        } else {
            alert('Error adding product');
        }
    } catch (error) {
        console.error('Server error:', error);
    }
});

// Function para makuha ang buong listahan (kasama ang bagong dagdag) at ipakita sa UI
async function loadProductsCatalog() {
    try {
        const response = await fetch('/api/products'); // Tatama sa GET /api/products mo
        const products = await response.json();

        const catalogContainer = document.getElementById('productCatalog'); // Palitan ng tamang ID sa HTML mo
        if (!catalogContainer) return;

        catalogContainer.innerHTML = ''; // I-clear muna

        // I-loop para lumabas lahat sa website nang kusang-kusang nakikita
        products.forEach(product => {
            catalogContainer.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px; object-fit:cover;">
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category}</p>
                    <p>Price: ₱${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

// Tawagin ito sa simula para lumabas ang mga produkto pagka-load ng page
window.onload = () => {
    loadProductsCatalog();
};
