import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface CartState {
  id: number;
  qty: number;
}

interface ShoppingCartContext {
  cartState: [CartState[], Dispatch<SetStateAction<CartState[]>>];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

export const CartContext = createContext<ShoppingCartContext | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState[]>([]);
  const addItem = (id: number) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].qty += 1;
        console.log(cart);
        return updatedCart;
      } else {
        return [...prev, { id, qty: 1 }];
      }
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const existingItem = prev[existingItemIndex];

        // Decrease the quantity, and if it becomes 0, remove the item
        const updatedCart =
          existingItem.qty > 1
            ? [
                ...prev.slice(0, existingItemIndex),
                { ...existingItem, qty: existingItem.qty - 1 },
                ...prev.slice(existingItemIndex + 1),
              ]
            : prev;
        console.log(cart);
        return updatedCart;
      }

      return prev;
    });
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const number = Number(ev.target.value);
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].qty = number || 1;

        return updatedCart;
      }

      return prev;
    });
  };

  const contextValue: ShoppingCartContext = {
    cartState: [cart, setCart],
    addItem,
    removeItem,
    handleChange,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
