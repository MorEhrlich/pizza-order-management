const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock data for orders
let orders = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  title: `Order #${i + 1}`,
  location: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180},
  orderTime: new Date().toISOString(),
  status: 'Received',
  subItems: [{ title: 'Pizza', amount: 1, type: 'Food' }],
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
