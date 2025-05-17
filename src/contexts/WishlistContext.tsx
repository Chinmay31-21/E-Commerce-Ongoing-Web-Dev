import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types';
import { getProductById } from '../data/products';

interface WishlistState {
  items: Product[];
}

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; payload: { product: Product } }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: { productId: string } }
  | { type: 'LOAD_WISHLIST'; payload: { items: Product[] } };

interface WishlistContextType {
  wishlist: WishlistState;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const initialState: WishlistState = {
  items: [],
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      // Don't add if already in wishlist
      if (state.items.some(item => item.id === action.payload.product.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload.product],
      };
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId),
      };
    
    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload.items,
      };
      
    default:
      return state;
  }
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, initialState);
  
  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const productIds = JSON.parse(savedWishlist) as string[];
        const products = productIds
          .map(id => getProductById(id))
          .filter((product): product is Product => product !== undefined);
        
        dispatch({ type: 'LOAD_WISHLIST', payload: { items: products } });
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const productIds = wishlist.items.map(item => item.id);
    localStorage.setItem('wishlist', JSON.stringify(productIds));
  }, [wishlist.items]);
  
  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: { product } });
  };
  
  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { productId } });
  };
  
  const isInWishlist = (productId: string) => {
    return wishlist.items.some(item => item.id === productId);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};