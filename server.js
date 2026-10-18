const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let products = [
  // 🐟 FRESHWATER FISHES
  { id: 1, name: "Fancy Guppy Fish", category: "Fishes", price: 60, image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500" },
  { id: 2, name: "Black Molly Fish", category: "Fishes", price: 50, image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500" },
  { id: 3, name: "Red Swordtail Fish", category: "Fishes", price: 70, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500" },
  { id: 4, name: "Freshwater Angelfish", category: "Fishes", price: 150, image: "https://images.unsplash.com/photo-1520301255226-bf5f14425149?w=500" },
  { id: 5, name: "Zebra Danio (Schooling Fish)", category: "Fishes", price: 40, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" },
  { id: 6, name: "Neon Tetra", category: "Fishes", price: 50, image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500" },
  { id: 7, name: "Cardinal Tetra", category: "Fishes", price: 65, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500" },
  { id: 8, name: "Electric Green Glo Tetra", category: "Fishes", price: 120, image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=500" },
  { id: 9, name: "Tiger Barb", category: "Fishes", price: 80, image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500" },
  { id: 10, name: "Betta Fish (Plakat)", category: "Fishes", price: 180, image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500" },
  { id: 11, name: "Betta Fish (Halfmoon)", category: "Fishes", price: 220, image: "https://images.unsplash.com/photo-1520301255226-bf5f14425149?w=500" },
  { id: 12, name: "Oranda Goldfish", category: "Fishes", price: 250, image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500" },
  { id: 13, name: "Ranchu Goldfish", category: "Fishes", price: 350, image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500" },
  { id: 14, name: "Ryukin Goldfish", category: "Fishes", price: 280, image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500" },
  { id: 15, name: "Black Moor Goldfish", category: "Fishes", price: 220, image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500" },
  { id: 16, name: "Bronze Corydoras (Bottom Feeder)", category: "Fishes", price: 90, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500" },
  { id: 17, name: "Dwarf Gourami", category: "Fishes", price: 160, image: "https://images.unsplash.com/photo-1520301255226-bf5f14425149?w=500" },

  // 🌱 AQUATIC PLANTS
  { id: 18, name: "Hornwort Plant", category: "Plants", price: 80, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" },
  { id: 19, name: "Guppy Grass", category: "Plants", price: 70, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" },
  { id: 20, name: "Java Fern", category: "Plants", price: 150, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" },
  { id: 21, name: "Anubias Nana Plant", category: "Plants", price: 250, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" },
  { id: 22, name: "Amazon Sword Plant", category: "Plants", price: 180, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500" },

  // ⚙️ ACCESSORIES
  { id: 23, name: "Quiet Silent Air Pump / Oxygen", category: "Accessories", price: 450, image: "https://images.unsplash.com/photo-1520301255226-bf5f14425149?w=500" },
  { id: 24, name: "Submersible Water Filter & Pump", category: "Accessories", price: 580, image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=500" },
  { id: 25, name: "Rimless Glass Aquarium (15 Gallons)", category: "Accessories", price: 1850, image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=500" },
  
  // 罐 FOOD & MEDICINE
  { id: 26, name: "High-Protein Fish Flakes & Pellets", category: "Food", price: 220, image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500" }
];

let orders = [];

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
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