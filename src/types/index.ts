
export interface SalesData {
  id: string;
  date: string;
  revenue: number;
  units: number;
  productId: string;
  customerId: string;
  locationId: string;
  channelId: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: 'Individual' | 'Corporate' | 'Government';
  loyaltyScore: number;
}

export interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  region: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'Online' | 'Retail' | 'Distributor' | 'Direct Sales';
}

export interface DashboardFilters {
  dateRange: [Date | null, Date | null];
  products: string[];
  categories: string[];
  locations: string[];
  channels: string[];
}

export interface SalesMetrics {
  totalRevenue: number;
  totalUnits: number;
  averageOrderValue: number;
  topSellingProduct: string;
  topLocation: string;
  topChannel: string;
  yearOverYearGrowth: number;
}

export interface RevenueTrend {
  period: string;
  revenue: number;
  units: number;
}

export interface ProductPerformance {
  productId: string;
  productName: string;
  revenue: number;
  units: number;
  category: string;
}

export interface RegionalSales {
  locationId: string;
  city: string;
  state: string;
  country: string;
  revenue: number;
  units: number;
  lat: number;
  lng: number;
}

export interface ChannelPerformance {
  channelId: string;
  channelName: string;
  revenue: number;
  units: number;
}

export interface KnowledgeGraphNode {
  id: string;
  type: 'product' | 'customer' | 'channel' | 'region';
  data: {
    label: string;
    value?: number;
    category?: string;
    details?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
  data?: {
    value: number;
    type: string;
  };
}
