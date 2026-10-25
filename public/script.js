async function handleAdminAddProduct(e) {
            e.preventDefault();
            const newProduct = {
                name: document.getElementById('adminItemName').value,
                category: document.getElementById('adminItemCategory').value,
                price: parseFloat(document.getElementById('adminItemPrice').value),
                stock: parseInt(document.getElementById('adminItemStock').value),
                image: document.getElementById('adminItemImg').value || "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500"
            };

            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProduct)
                });

                if (response.ok) {
                    document.getElementById('adminAddForm').reset();
                    showCustomPopup("New product added to catalog successfully!");
                    await fetchProducts(); // Hihilahin nito agad ang updated list at ilalagay sa screen!
                } else {
                    showCustomPopup("Failed to add product.");
                }
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
