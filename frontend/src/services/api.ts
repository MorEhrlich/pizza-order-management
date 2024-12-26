const API_BASE = 'http://localhost:5000';

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE}/orders`);
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
};

export const updateOrderStatus = async (id: number, status: string) => {
  const response = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update order status');
  return response.json();
};
