const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
const generateRandomSubItems = () => {
  const baseItems = [
    { title: 'Margherita Pizza', type: 'Pizza' },
    { title: 'Pepperoni Pizza', type: 'Pizza' },
    { title: 'Caesar Salad', type: 'Salad' },
    { title: 'Greek Salad', type: 'Salad' },
    { title: 'Garden Salad', type: 'Salad' },
  ];

  const toppings = [
    { title: 'Mushroom Topping', type: 'Topping' },
    { title: 'Extra Cheese', type: 'Topping' },
    { title: 'Olives', type: 'Topping' },
    { title: 'Bacon Topping', type: 'Topping' },
  
  ];

  // Select a random base item
  const randomBaseIndex = Math.floor(Math.random() * baseItems.length);
  const baseItem = baseItems[randomBaseIndex];

  // Add random toppings (1-3) to the selected base item
  const numToppings = Math.floor(Math.random() * 3) + 1; // Random number of toppings (1-3)
  const selectedToppings = Array.from({ length: numToppings }, () => {
    const toppingIndex = Math.floor(Math.random() * toppings.length);
    return toppings[toppingIndex];
  });

  // Combine the base item with its toppings
  return [
    { ...baseItem, amount: 1 }, // Base item with an amount
    ...selectedToppings.map((topping) => ({ ...topping, amount: 1 })), // Toppings with an amount
  ];
};


const generateRandomSubItems2 = () => { 
  const baseItems = [
    { title: 'Margherita Pizza', type: 'Pizza' },
    { title: 'Pepperoni Pizza', type: 'Pizza' },
    { title: 'Caesar Salad', type: 'Salad' },
    { title: 'Greek Salad', type: 'Salad' },
    { title: 'Garden Salad', type: 'Salad' },
  ];

  const toppings = [
    { title: 'Mushroom Topping', type: 'Topping' },
    { title: 'Extra Cheese', type: 'Topping' },
    { title: 'Olives', type: 'Topping' },
    { title: 'Bacon Topping', type: 'Topping' },
  ];

  // Select a random base item
  const randomBaseIndex = Math.floor(Math.random() * baseItems.length);
  const baseItem = baseItems[randomBaseIndex];

  // Add random toppings (1-3) to the selected base item
  const numToppings = Math.floor(Math.random() * 3) + 1; // Random number of toppings (1-3)
  const selectedToppings = Array.from({ length: numToppings }, () => {
    const toppingIndex = Math.floor(Math.random() * toppings.length);
    return {
      ...toppings[toppingIndex],
      amount: Math.floor(Math.random() * 3) + 1, // Randomize amount (1-3)
    };
  });

  // Combine the base item with its toppings
  return {
    ...baseItem,
    amount: Math.floor(Math.random() * 3) + 1, // Randomize base item amount (1-3)
    toppings: selectedToppings, // Toppings as an array within the base item
  };
};




// Mock data for orders
let orders = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  title: `Order #${i + 1}`,
  location: { lat: Math.random() * 90, lng: Math.random() * 180 },
  orderTime: new Date().toISOString(),
  status: 'Received',
  subItems:  generateRandomSubItems(),
}));

// API Endpoints
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.post('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(order => order.id === parseInt(id));
  if (order) {
    order.status = status;
    res.json({ message: 'Status updated', order });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
