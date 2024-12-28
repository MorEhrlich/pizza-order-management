import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.Icon.Default.prototype as any; 
delete DefaultIcon._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Order {
  id: number;
  title: string;
  location: { lat: number; lng: number };
}

interface Props {
  orders: Order[];
}

const OrderMap: React.FC<Props> = ({ orders }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {orders.map((order) => (
        <Marker key={order.id} position={[order.location.lat, order.location.lng]}>
          <Popup>{order.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  ); 
};

export default OrderMap;
