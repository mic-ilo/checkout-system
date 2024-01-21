import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

interface Props {
  name: string;
  price: number;
  qty: number;
  image: string;
  setTotal: React.Dispatch<React.SetStateAction<number[]>>;
  id: number;
}

export default function CartItemCard({
  name,
  price,
  qty,
  image,
  setTotal,
  id,
}: Props) {
  const totalPerItem: (price: number, qty: number) => number = (price, qty) => {
    const total = price * qty;
    return Number(total.toFixed(2));
  };

  const { addItem, removeItem, handleChange, cartState } =
    useContext(CartContext)!;
  const [cart, setCart] = cartState;

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setTotal((prevTotal) => [...prevTotal, totalPerItem(price, qty)]);
  }, [price, qty, setTotal]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart !== null) {
      const items = JSON.parse(storedCart);
      setCart(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full p-5">
      <div className="flex items-center gap-2 bg shadow-xl p-3  ">
        <div className="object-cover w-60 ">
          <img src={`../src/assets/${image}`} alt={name} />
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p>
            <span className="font-bold">Price:</span> $ {price}
          </p>
          <p>
            <span className="font-bold">Quantity:</span>{" "}
            <button
              className="bg-amber-500 px-2 rounded-md font-bold mr-2"
              type="button"
              onClick={() => removeItem(id)}
            >
              -
            </button>
            <input
              type="number"
              placeholder="Qty"
              className="border-2 w-12 text-center"
              min={1}
              value={qty}
              onChange={(ev) => handleChange(ev, id)}
            />
            <button
              className="bg-amber-500 px-2 rounded-md font-bold ml-2"
              type="button"
              onClick={() => addItem(id)}
            >
              +
            </button>
          </p>
          <p>
            <span className="font-bold">Total:</span> ${" "}
            {totalPerItem(price, qty)}
          </p>
        </div>
      </div>
    </div>
  );
}
