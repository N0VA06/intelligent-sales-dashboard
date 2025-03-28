
import { 
  Product, 
  Customer, 
  Location, 
  Channel, 
  SalesData,
  RevenueTrend,
  ProductPerformance,
  RegionalSales,
  ChannelPerformance,
  KnowledgeGraphNode,
  KnowledgeGraphEdge
} from '@/types';

// Products data
export const products: Product[] = [
  { id: 'p1', name: 'Smartphone', category: 'Electronics', price: 799 },
  { id: 'p2', name: 'Laptop', category: 'Electronics', price: 1299 },
  { id: 'p3', name: 'Coffee Maker', category: 'Home Appliances', price: 99 },
  { id: 'p4', name: 'Running Shoes', category: 'Sportswear', price: 89 },
  { id: 'p5', name: 'Office Chair', category: 'Furniture', price: 199 },
  { id: 'p6', name: 'Headphones', category: 'Electronics', price: 149 },
  { id: 'p7', name: 'Water Bottle', category: 'Accessories', price: 25 },
  { id: 'p8', name: 'Air Fryer', category: 'Home Appliances', price: 129 },
  { id: 'p9', name: 'Fitness Tracker', category: 'Electronics', price: 79 },
  { id: 'p10', name: 'Backpack', category: 'Accessories', price: 59 }
];

// Customers data
export const customers: Customer[] = [
  { id: 'c1', name: 'John Smith', email: 'john@example.com', segment: 'Individual', loyaltyScore: 85 },
  { id: 'c2', name: 'Acme Corp', email: 'info@acme.com', segment: 'Corporate', loyaltyScore: 92 },
  { id: 'c3', name: 'Sarah Johnson', email: 'sarah@example.com', segment: 'Individual', loyaltyScore: 78 },
  { id: 'c4', name: 'City Hospital', email: 'info@cityhospital.org', segment: 'Government', loyaltyScore: 96 },
  { id: 'c5', name: 'Robert Davis', email: 'robert@example.com', segment: 'Individual', loyaltyScore: 65 },
  { id: 'c6', name: 'Tech Solutions Inc', email: 'sales@techsolutions.com', segment: 'Corporate', loyaltyScore: 88 },
  { id: 'c7', name: 'Local School District', email: 'admin@lsd.edu', segment: 'Government', loyaltyScore: 91 },
  { id: 'c8', name: 'Maria Garcia', email: 'maria@example.com', segment: 'Individual', loyaltyScore: 82 }
];

// Locations data
export const locations: Location[] = [
  { id: 'l1', city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060, region: 'Northeast' },
  { id: 'l2', city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437, region: 'West' },
  { id: 'l3', city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298, region: 'Midwest' },
  { id: 'l4', city: 'Houston', state: 'TX', country: 'USA', lat: 29.7604, lng: -95.3698, region: 'South' },
  { id: 'l5', city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740, region: 'West' },
  { id: 'l6', city: 'Philadelphia', state: 'PA', country: 'USA', lat: 39.9526, lng: -75.1652, region: 'Northeast' },
  { id: 'l7', city: 'San Antonio', state: 'TX', country: 'USA', lat: 29.4241, lng: -98.4936, region: 'South' },
  { id: 'l8', city: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lng: -117.1611, region: 'West' },
  { id: 'l9', city: 'Dallas', state: 'TX', country: 'USA', lat: 32.7767, lng: -96.7970, region: 'South' },
  { id: 'l10', city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194, region: 'West' }
];

// Channels data
export const channels: Channel[] = [
  { id: 'ch1', name: 'E-commerce', type: 'Online' },
  { id: 'ch2', name: 'Retail Stores', type: 'Retail' },
  { id: 'ch3', name: 'Wholesale Partners', type: 'Distributor' },
  { id: 'ch4', name: 'Sales Team', type: 'Direct Sales' }
];

// Generate mock revenue trends
export const revenueTrends: RevenueTrend[] = [
  { period: 'Jan', revenue: 420000, units: 5200 },
  { period: 'Feb', revenue: 450000, units: 5600 },
  { period: 'Mar', revenue: 480000, units: 5900 },
  { period: 'Apr', revenue: 520000, units: 6300 },
  { period: 'May', revenue: 490000, units: 6000 },
  { period: 'Jun', revenue: 540000, units: 6700 },
  { period: 'Jul', revenue: 580000, units: 7100 },
  { period: 'Aug', revenue: 560000, units: 6800 },
  { period: 'Sep', revenue: 610000, units: 7500 },
  { period: 'Oct', revenue: 650000, units: 8000 },
  { period: 'Nov', revenue: 680000, units: 8300 },
  { period: 'Dec', revenue: 710000, units: 8600 }
];

// Product performance data
export const productPerformance: ProductPerformance[] = [
  { productId: 'p1', productName: 'Smartphone', revenue: 1200000, units: 1500, category: 'Electronics' },
  { productId: 'p2', productName: 'Laptop', revenue: 2600000, units: 2000, category: 'Electronics' },
  { productId: 'p6', productName: 'Headphones', revenue: 750000, units: 5000, category: 'Electronics' },
  { productId: 'p9', productName: 'Fitness Tracker', revenue: 480000, units: 6000, category: 'Electronics' },
  { productId: 'p3', productName: 'Coffee Maker', revenue: 320000, units: 3200, category: 'Home Appliances' },
  { productId: 'p8', productName: 'Air Fryer', revenue: 420000, units: 3200, category: 'Home Appliances' },
  { productId: 'p4', productName: 'Running Shoes', revenue: 540000, units: 6000, category: 'Sportswear' },
  { productId: 'p5', productName: 'Office Chair', revenue: 380000, units: 1900, category: 'Furniture' },
  { productId: 'p7', productName: 'Water Bottle', revenue: 200000, units: 8000, category: 'Accessories' },
  { productId: 'p10', productName: 'Backpack', revenue: 300000, units: 5000, category: 'Accessories' }
];

// Regional sales data
export const regionalSales: RegionalSales[] = [
  { locationId: 'l1', city: 'New York', state: 'NY', country: 'USA', revenue: 1250000, units: 13500, lat: 40.7128, lng: -74.0060 },
  { locationId: 'l2', city: 'Los Angeles', state: 'CA', country: 'USA', revenue: 980000, units: 10200, lat: 34.0522, lng: -118.2437 },
  { locationId: 'l10', city: 'San Francisco', state: 'CA', country: 'USA', revenue: 870000, units: 9200, lat: 37.7749, lng: -122.4194 },
  { locationId: 'l3', city: 'Chicago', state: 'IL', country: 'USA', revenue: 720000, units: 7800, lat: 41.8781, lng: -87.6298 },
  { locationId: 'l4', city: 'Houston', state: 'TX', country: 'USA', revenue: 650000, units: 7000, lat: 29.7604, lng: -95.3698 },
  { locationId: 'l9', city: 'Dallas', state: 'TX', country: 'USA', revenue: 580000, units: 6200, lat: 32.7767, lng: -96.7970 },
  { locationId: 'l5', city: 'Phoenix', state: 'AZ', country: 'USA', revenue: 450000, units: 4800, lat: 33.4484, lng: -112.0740 },
  { locationId: 'l6', city: 'Philadelphia', state: 'PA', country: 'USA', revenue: 420000, units: 4500, lat: 39.9526, lng: -75.1652 },
  { locationId: 'l8', city: 'San Diego', state: 'CA', country: 'USA', revenue: 380000, units: 4100, lat: 32.7157, lng: -117.1611 },
  { locationId: 'l7', city: 'San Antonio', state: 'TX', country: 'USA', revenue: 350000, units: 3800, lat: 29.4241, lng: -98.4936 }
];

// Channel performance data
export const channelPerformance: ChannelPerformance[] = [
  { channelId: 'ch1', channelName: 'E-commerce', revenue: 3200000, units: 36000 },
  { channelId: 'ch2', channelName: 'Retail Stores', revenue: 2400000, units: 25000 },
  { channelId: 'ch3', channelName: 'Wholesale Partners', revenue: 1800000, units: 18000 },
  { channelId: 'ch4', channelName: 'Sales Team', revenue: 1200000, units: 12000 }
];

// Knowledge Graph Nodes
export const knowledgeGraphNodes: KnowledgeGraphNode[] = [
  // Product nodes
  { id: 'p1', type: 'product', data: { label: 'Smartphone', category: 'Electronics', value: 1200000 }, position: { x: 100, y: 100 } },
  { id: 'p2', type: 'product', data: { label: 'Laptop', category: 'Electronics', value: 2600000 }, position: { x: 100, y: 200 } },
  { id: 'p6', type: 'product', data: { label: 'Headphones', category: 'Electronics', value: 750000 }, position: { x: 100, y: 300 } },
  { id: 'p9', type: 'product', data: { label: 'Fitness Tracker', category: 'Electronics', value: 480000 }, position: { x: 100, y: 400 } },
  
  // Customer nodes
  { id: 'c1', type: 'customer', data: { label: 'John Smith', details: 'Individual' }, position: { x: 300, y: 50 } },
  { id: 'c2', type: 'customer', data: { label: 'Acme Corp', details: 'Corporate' }, position: { x: 300, y: 150 } },
  { id: 'c4', type: 'customer', data: { label: 'City Hospital', details: 'Government' }, position: { x: 300, y: 250 } },
  { id: 'c6', type: 'customer', data: { label: 'Tech Solutions', details: 'Corporate' }, position: { x: 300, y: 350 } },
  
  // Region nodes
  { id: 'r1', type: 'region', data: { label: 'Northeast', value: 1670000 }, position: { x: 500, y: 100 } },
  { id: 'r2', type: 'region', data: { label: 'West', value: 2680000 }, position: { x: 500, y: 200 } },
  { id: 'r3', type: 'region', data: { label: 'Midwest', value: 720000 }, position: { x: 500, y: 300 } },
  { id: 'r4', type: 'region', data: { label: 'South', value: 1580000 }, position: { x: 500, y: 400 } },
  
  // Channel nodes
  { id: 'ch1', type: 'channel', data: { label: 'E-commerce', value: 3200000 }, position: { x: 700, y: 150 } },
  { id: 'ch2', type: 'channel', data: { label: 'Retail Stores', value: 2400000 }, position: { x: 700, y: 250 } },
  { id: 'ch3', type: 'channel', data: { label: 'Wholesale', value: 1800000 }, position: { x: 700, y: 350 } },
];

// Knowledge Graph Edges
export const knowledgeGraphEdges: KnowledgeGraphEdge[] = [
  // Product to Customer connections
  { id: 'e1-1', source: 'p1', target: 'c1', data: { value: 25000, type: 'purchase' } },
  { id: 'e1-2', source: 'p1', target: 'c2', data: { value: 180000, type: 'purchase' } },
  { id: 'e1-3', source: 'p2', target: 'c2', data: { value: 350000, type: 'purchase' } },
  { id: 'e1-4', source: 'p2', target: 'c4', data: { value: 280000, type: 'purchase' } },
  { id: 'e1-5', source: 'p6', target: 'c1', data: { value: 12000, type: 'purchase' } },
  { id: 'e1-6', source: 'p9', target: 'c1', data: { value: 8000, type: 'purchase' } },
  { id: 'e1-7', source: 'p6', target: 'c6', data: { value: 95000, type: 'purchase' } },
  
  // Product to Region connections
  { id: 'e2-1', source: 'p1', target: 'r1', data: { value: 320000, type: 'sales' } },
  { id: 'e2-2', source: 'p1', target: 'r2', data: { value: 450000, type: 'sales' } },
  { id: 'e2-3', source: 'p2', target: 'r2', data: { value: 1200000, type: 'sales' } },
  { id: 'e2-4', source: 'p6', target: 'r3', data: { value: 180000, type: 'sales' } },
  { id: 'e2-5', source: 'p9', target: 'r4', data: { value: 220000, type: 'sales' } },
  
  // Region to Channel connections
  { id: 'e3-1', source: 'r1', target: 'ch1', data: { value: 780000, type: 'channel_sales' } },
  { id: 'e3-2', source: 'r2', target: 'ch1', data: { value: 1250000, type: 'channel_sales' } },
  { id: 'e3-3', source: 'r3', target: 'ch2', data: { value: 350000, type: 'channel_sales' } },
  { id: 'e3-4', source: 'r4', target: 'ch2', data: { value: 680000, type: 'channel_sales' } },
  { id: 'e3-5', source: 'r2', target: 'ch3', data: { value: 920000, type: 'channel_sales' } },
  
  // Customer to Channel connections
  { id: 'e4-1', source: 'c1', target: 'ch1', data: { value: 45000, type: 'customer_channel' } },
  { id: 'e4-2', source: 'c2', target: 'ch3', data: { value: 530000, type: 'customer_channel' } },
  { id: 'e4-3', source: 'c4', target: 'ch2', data: { value: 280000, type: 'customer_channel' } },
  { id: 'e4-4', source: 'c6', target: 'ch1', data: { value: 95000, type: 'customer_channel' } },
];

// Calculate total sales metrics
export const salesMetrics = {
  totalRevenue: productPerformance.reduce((sum, product) => sum + product.revenue, 0),
  totalUnits: productPerformance.reduce((sum, product) => sum + product.units, 0),
  averageOrderValue: Math.round(
    productPerformance.reduce((sum, product) => sum + product.revenue, 0) / 
    productPerformance.reduce((sum, product) => sum + product.units, 0) * 100
  ) / 100,
  topSellingProduct: 'Laptop',
  topLocation: 'New York',
  topChannel: 'E-commerce',
  yearOverYearGrowth: 12.5
};
