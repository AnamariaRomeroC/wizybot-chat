export interface ApiProduct {
  id: string;
  displayTitle: string;
  imageUrl: string;
  url: string;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  productUrl: string;
}

export interface Message {
  id: string;
  text?: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  type?: 'text' | 'typing' | 'product_recommendation';
  products?: Product[];
}