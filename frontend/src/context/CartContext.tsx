import { useState, createContext, ReactNode } from "react";

export const CartContext = createContext<
  [CartState[], React.Dispatch<React.SetStateAction<CartState[]>>]
>([[], () => {}]);

export interface CartState {
  id: number;
  qty: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState[]>([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}
