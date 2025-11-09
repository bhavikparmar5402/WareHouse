import bcrypt from 'bcryptjs';

export const initialItems = [
  {
    barcode: 'WMS12345',
    name: 'MTR Masala Mix',
    weight: '200g',
    brand: 'MTR',
    quantity: 45,
    location: 'Rack A2',
    expiry: 'Oct 17, 2025',
  },
  {
    barcode: 'WMS12346',
    name: 'MTR Sambar Powder',
    weight: '500g',
    brand: 'MTR',
    quantity: 128,
    location: 'Rack B5',
    expiry: 'Oct 17, 2025',
  },
  {
    barcode: 'WMS12347',
    name: 'MTR Gulab Jamun Mix',
    weight: '175g',
    brand: 'MTR',
    quantity: 32,
    location: 'Rack C1',
    expiry: 'Oct 16, 2025',
  },
  {
    barcode: 'WMS12348',
    name: 'Parasuit Oil',
    weight: '1L',
    brand: 'Parasuit',
    quantity: 8,
    location: 'Rack D3',
    expiry: 'Oct 15, 2025',
  },
  {
    barcode: 'WMS12349',
    name: 'Parasuit Shampoo',
    weight: '650ml',
    brand: 'Parasuit',
    quantity: 67,
    location: 'Rack A7',
    expiry: 'Oct 17, 2025',
  },
  {
    barcode: 'WMS12350',
    name: 'Parasuit Conditioner',
    weight: '400ml',
    brand: 'Parasuit',
    quantity: 92,
    location: 'Rack E4',
    expiry: 'Oct 16, 2025',
  },
  {
    barcode: 'WMS12351',
    name: 'Dabour Honey',
    weight: '500g',
    brand: 'Dabour',
    quantity: 23,
    location: 'Rack A1',
    expiry: 'Oct 17, 2025',
  },
  {
    barcode: 'WMS12352',
    name: 'Dabour Amla Oil',
    weight: '300ml',
    brand: 'Dabour',
    quantity: 54,
    location: 'Rack F2',
    expiry: 'Oct 15, 2025',
  },
];

export const initialActivities = [
  {
    timestamp: new Date(),
    activity: 'Item Scanned',
    item: 'MTR Masala Mix',
    location: 'Rack A2',
    status: 'Received',
  },
  {
    timestamp: new Date(),
    activity: 'Order Shipped',
    item: 'Parasuit Oil',
    location: 'Rack B5',
    status: 'Shipped',
  },
  {
    timestamp: new Date(),
    activity: 'Item Scanned',
    item: 'Dabour Honey',
    location: 'Rack C1',
    status: 'Received',
  },
  {
    timestamp: new Date(),
    activity: 'Low Stock Alert',
    item: 'MTR Sambar Powder',
    location: 'Rack D3',
    status: 'Alert',
  },
  {
    timestamp: new Date(),
    activity: 'Item Scanned',
    item: 'Parasuit Shampoo',
    location: 'Rack A7',
    status: 'Received',
  },
];

export const initialUsers = async () => [
  {
    username: 'admin',
    password: await bcrypt.hash('admin', 10),
    role: 'admin',
  },
];
