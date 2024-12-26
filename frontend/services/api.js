const API_BASE = 'http://localhost:5000';

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE}/orders`);
  return response.json();
};

export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return response.json();
};
