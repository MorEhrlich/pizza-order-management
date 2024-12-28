import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Types
interface Location {
  lat: number;
  lng: number;
}

interface SubItem {
  title: string;
  type: string;
  amount?: number;
}

interface Order {
  id: number;
  title: string;
  location: Location;
  orderTime: string;
  status: string;
  subItems: SubItem[];
}

// Helper functions
const generateRandomSubItems = (): SubItem[] => {
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

  const randomBaseIndex = Math.floor(Math.random() * baseItems.length);
  const baseItem = baseItems[randomBaseIndex];

  const numToppings = Math.floor(Math.random() * 3) + 1;
  const selectedToppings = Array.from({ length: numToppings }, () => {
    const toppingIndex = Math.floor(Math.random() * toppings.length);
    return { ...toppings[toppingIndex], amount: 1 };
  });

  return [{ ...baseItem, amount: 1 }, ...selectedToppings];
};

// const generateRandomSubItems2 = (): SubItem => {
//   const baseItems = [
//     { title: 'Margherita Pizza', type: 'Pizza' },
//     { title: 'Pepperoni Pizza', type: 'Pizza' },
//     { title: 'Caesar Salad', type: 'Salad' },
//     { title: 'Greek Salad', type: 'Salad' },
//     { title: 'Garden Salad', type: 'Salad' },
//   ];

//   const toppings = [
//     { title: 'Mushroom Topping', type: 'Topping' },
//     { title: 'Extra Cheese', type: 'Topping' },
//     { title: 'Olives', type: 'Topping' },
//     { title: 'Bacon Topping', type: 'Topping' },
//   ];

//   const randomBaseIndex = Math.floor(Math.random() * baseItems.length);
//   const baseItem = baseItems[randomBaseIndex];

//   const numToppings = Math.floor(Math.random() * 3) + 1;
//   const selectedToppings = Array.from({ length: numToppings }, () => {
//     const toppingIndex = Math.floor(Math.random() * toppings.length);
//     return { ...toppings[toppingIndex], amount: Math.floor(Math.random() * 3) + 1 };
//   });

//   return {
//     ...baseItem,
//     amount: Math.floor(Math.random() * 3) + 1,
//     toppings: selectedToppings,
//   };
// };
const generateOrderTime = (index: number, baseTime: Date) => {
  const delay = index * 60000; 
  return new Date(baseTime.getTime() - delay).toISOString();
};
// Mock data
let orders = Array.from({ length: 300 }, (_, i) => {
  const baseTime = new Date(); 
  return {
    id: i + 1,
    title: `Order #${i + 1}`,
    location: { lat: Math.random() * 90, lng: Math.random() * 180 },
    orderTime: generateOrderTime(i, baseTime), 
    status: ['Received', 'Preparing', 'Ready', 'EnRoute', 'Delivered'][Math.floor(Math.random() * 5)],
    subItems: generateRandomSubItems(),
  };
});

// API Endpoints
app.get('/orders', (req: Request, res: Response) => {
  res.json(orders);
});

app.post('/orders/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((order) => order.id === parseInt(id));
  if (order) {
    order.status = status;
    res.json({ message: 'Status updated', order });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
