import Logo from "../assets/logo.png";
import Cart from "../assets/cart.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export default function Navbar() {
  const { countCartItems } = useContext(CartContext)!;

  return (
    <div className="bg-black">
      <div className="flex justify-between bg-black shadow-slate-700 mb-5 p-3 items-center pb-4 sticky max-w-7xl mx-auto  ">
        <Link to="/">
          <div className="flex items-center gap-5">
            <img src={Logo} alt="logo" width={50} className="rounded-full" />
            <p className="text-lg font-bold text-white">DEPAATO</p>
          </div>
        </Link>

        <div className="hover:scale-110 transition-transform duration-300 ease-in-out ">
          <Link to={"/cart"} className="relative">
            <img src={Cart} alt="cart" width={80} />
            <p className="absolute right-0 bottom-0 text-red-500 font-bold text-lg px-2 rounded-full bg-white">
              {countCartItems()}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
