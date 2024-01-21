import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useState, createContext } from "react";

export const CartContext = createContext<
  [CartState[], React.Dispatch<React.SetStateAction<CartState[]>>]
>([[], () => {}]);
export interface CartState {
  id: number;
  qty: number;
}

export default function App() {
  const [cart, setCart] = useState<CartState[]>([]);
  console.log(cart);
  return (
    <div>
      <CartContext.Provider value={[cart, setCart]}>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}
