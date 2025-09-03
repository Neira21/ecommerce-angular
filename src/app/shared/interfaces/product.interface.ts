
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


export interface ProductInCart{
  product: Product; // The product details
  quantity: number; // Optional, used to track quantity in cart
}


export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  searchTerm?: string;
}
