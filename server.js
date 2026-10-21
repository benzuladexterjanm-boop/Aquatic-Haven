const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let products = [
  // 🐟 FRESHWATER FISHES
  { id: 1, name: "Fancy Guppy Fish", category: "Fishes", price: 60, stock: 25, image: "https://aquariumfishonline.com.au/wp-content/uploads/2022/03/Guppies-Male-New.jpg" },
  { id: 2, name: "Black Molly Fish", category: "Fishes", price: 50, stock: 20, image: "https://gensou.sg/wp-content/uploads/2026/03/black_molly_400x_05742c9c-8835-4b3d-b604-35c75f682099.jpg" },
  { id: 3, name: "Red Swordtail Fish", category: "Fishes", price: 70, stock: 15, image: "https://dansfish.com/cdn/shop/files/Dans-Fish-Albino-Red-Vienna-Cauliflower-Swordtail-Pair-1M1F-Albino-RER-Red-Vienna-Cauliflower-Swordtail-Xiphophorus-helleri-1-96cb8f0f2d7542e8a675fdc7b33f706d-14299.jpg?v=1778636527" },
  { id: 4, name: "Freshwater Angelfish", category: "Fishes", price: 150, stock: 10, image: "https://tropicalfishco.co.uk/cdn-cgi/image/width=1440,quality=75,format=auto,fit=scale-down/editorial/landing-pages/angelfish-types-uk/freshwater-angelfish-types-six-varieties.webp" },
  { id: 5, name: "Danios (Schooling Fish)", category: "Fishes", price: 40, stock: 30, image: "https://shop.glofish.com/cdn/shop/products/Assorted_Danio_Collection_12_ct..jpg?v=1582560105" },
  { id: 6, name: "Neon Tetra", category: "Fishes", price: 50, stock: 40, image: "https://petcorpbacolod.com/wp-content/uploads/2024/09/neon-tetra-1024x1024.png" },
  { id: 7, name: "Cardinal Tetra", category: "Fishes", price: 65, stock: 25, image: "https://aquariumfishonline.com.au/wp-content/uploads/2019/08/Tetra-Cardinal-New.jpg" },
  { id: 8, name: "Glo Tetra", category: "Fishes", price: 120, stock: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8IrWDKsTA9uHawJrhAXdeB8pEgkfe-aHbW5dWVZpPNQ8VzLUtSS82fQ&s=10" },
  { id: 9, name: "Tiger Barb", category: "Fishes", price: 80, stock: 22, image: "https://www.aquariumcoop.com/cdn/shop/articles/care-guide-for-tiger-barbs-colorful-and-rowdy-schooling-fish-8145370.jpg?v=1766094886" },
  { id: 10, name: "Betta Fish (Plakat)", category: "Fishes", price: 180, stock: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREmxzTb0Z1vYvsTQ3ZfrwEGiPj8rdH5gPUCpoIwNI96LiYRrQ-czgARLw&s=10" },
  { id: 11, name: "Betta Fish (Halfmoon)", category: "Fishes", price: 220, stock: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn8UN6O0unA9hgVyF-4nRENDsfFYQ_Ne7ZSsPcKnT79_e_jKUugePAQGGr&s=10" },
  { id: 12, name: "Oranda Goldfish", category: "Fishes", price: 250, stock: 14, image: "https://simstropicalfish.co.uk/wp-content/uploads/2024/02/Assorted-Giant-Oranda.png" },
  { id: 13, name: "Ranchu Goldfish", category: "Fishes", price: 350, stock: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWAqfysB2MPn0Tc9duYub06hjsxT8df_vll70eG9L1Uf4y-q8BG6hiQY&s=10" },
  { id: 14, name: "Ryukin Goldfish", category: "Fishes", price: 280, stock: 11, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtT0fOjoRkLg5ldavUXjSFalaDZgRHSZ1jgF4Ne0TtdpaMcUVUjpkGEHc&s=10" },
  { id: 15, name: "Black Moor Goldfish", category: "Fishes", price: 220, stock: 16, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbAc-yp5IG9b77-VcrdwGl-liRhabaoJUccmhiE1iF_bcwi_a0UPUrE2P&s=10" },
  { id: 16, name: "Corydoras (Bottom Feeder)", category: "Fishes", price: 90, stock: 20, image: "https://squeakysaquatics.com/cdn/shop/files/image_c2035a00-7fab-4996-bb0f-0e52687dc264.png?v=1770475186" },
  { id: 17, name: "Dwarf Gourami", category: "Fishes", price: 160, stock: 13, image: "https://www.tropco.co.uk/images/assorted%20gourami%20male.jpg" },

  // 🌱 AQUATIC PLANTS
  { id: 18, name: "Hornwort Plant", category: "Plants", price: 80, stock: 35, image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ceratophyllum_demersum.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" },
  { id: 19, name: "Guppy Grass", category: "Plants", price: 70, stock: 40, image: "https://killeraquatic.com/cdn/shop/files/ScreenShot2025-09-19at1.09.17PM.png?v=1758305575" },
  { id: 20, name: "Java Fern", category: "Plants", price: 150, stock: 25, image: "https://cloudaqua.co.uk/cdn/shop/files/preview_images/790963f5aed44f13bd6c28960272b76c.thumbnail.0000000000.jpg?v=1763522151&width=2160" },
  { id: 21, name: "Anubias Nana Plant", category: "Plants", price: 250, stock: 15, image: "https://www.plantsolve.com/assets/images/anubias-nana.webp" },
  { id: 22, name: "Amazon Sword Plant", category: "Plants", price: 180, stock: 18, image: "https://i.etsystatic.com/22016538/r/il/db87b0/2872847529/il_1080xN.2872847529_eg2h.jpg" },

  // ⚙️ ACCESSORIES
  { id: 23, name: "Quiet Silent Air Pump / Oxygen", category: "Accessories", price: 450, stock: 10, image: "https://m.media-amazon.com/images/I/61NrMbYsuBL.jpg" },
  { id: 24, name: "Submersible Water Filter & Pump", category: "Accessories", price: 580, stock: 8, image: "https://images-na.ssl-images-amazon.com/images/I/61AgbKtvz0L.jpg" },
  { id: 25, name: "Rimless Glass Aquarium (15 Gallons)", category: "Accessories", price: 1850, stock: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJDTaEwdAvK2uzLeC4rV-2BSRSOLbvHZv-ZnyQp4iu1KS6g0RDAI44ykI&s=10" },
  
  // 🥫 FOOD & MEDICINE
  { id: 26, name: "High-Protein Fish Flakes & Pellets", category: "Food", price: 220, stock: 50, image: "https://m.media-amazon.com/images/I/81yzEPzezbL.jpg" }
];

let orders = [];

// GET ALL PRODUCTS
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// ADMIN LOGIN ENDPOINT
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin_aquatic' && password === 'aquatic2026') {
    return res.status(200).json({ 
      message: "Admin login successful", 
      user: { email: 'admin_aquatic', role: 'admin' } 
    });
  }
  res.status(401).json({ error: "Invalid admin credentials" });
});

// ADMIN: POST ADD NEW PRODUCT
app.post('/api/products', (req, res) => {
  const { name, category, price, stock, image } = req.body;
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name: name || "New Aquatic Product",
    category: category || "Fishes",
    price: parseFloat(price) || 0,
    stock: parseInt(stock) || 10,
    image: image || "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500"
  };
  products.push(newProduct);
  res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// ADMIN: PUT UPDATE PRODUCT PRICE & STOCKS
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { price, stock } = req.body;
  const product = products.find(p => p.id === productId);

  if (product) {
    if (price !== undefined) product.price = parseFloat(price);
    if (stock !== undefined) product.stock = parseInt(stock);
    res.status(200).json({ message: "Product updated successfully", product });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.get('/api/orders', (req, res) => {
  const email = req.query.email;
  if (email) {
    const userOrders = orders.filter(o => o.customerEmail === email);
    return res.status(200).json(userOrders);
  }
  res.status(200).json(orders);
});

app.post('/api/orders', (req, res) => {
  const { name, email, address, contact, paymentMethod, cartItems, shippingFee, totalPrice } = req.body;

  const newOrder = {
    orderId: orders.length + 1001,
    customerName: name,
    customerEmail: email,
    address,
    contact,
    paymentMethod,
    items: cartItems,
    shippingFee,
    totalPrice,
    status: "Pending",
    orderDate: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Order placed successfully!", order: newOrder });
});

app.post('/api/orders/:id/refund', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = "Refunded";
    return res.status(200).json({ message: "Refund requested", order });
  }
  res.status(404).json({ error: "Order not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
