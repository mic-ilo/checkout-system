import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import dataDB from "../data/items.json";
interface Props {
  name: string;
  price: number;
  qty: number;
  image: string;
  setTotal: React.Dispatch<
    React.SetStateAction<{ id: number; total: number }[]>
  >;
  id: number;
}

export default function CartItemCard({
  name,
  price,
  image,
  setTotal,
  id,
}: Props) {
  const { addItem, removeItem, handleChange, cartState, removeFromCart } =
    useContext(CartContext)!;
  const [cart, setCart] = cartState;
  const itemInCart = cart.find((item) => item.id === id);
  const ItemQuantity = itemInCart?.qty ?? 0;

  const totalPerItem: (price: number, qty: number) => number = (price, qty) => {
    const total = price * qty;
    return Number(total.toFixed(2));
  };

  useEffect(() => {
    const updatedTotal = cart.map(({ id, qty }) => {
      const item = dataDB.find((item) => Number(item.uuid) === id);
      const price = item ? parseFloat(item.price) : 0;
      return {
        id,
        total: totalPerItem(price, qty),
      };
    });

    setTotal(updatedTotal);
  }, [cart, setTotal]);

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
              value={itemInCart?.qty || 1}
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
            {totalPerItem(price, ItemQuantity)}
          </p>
          <p
            className="text-blue-800 cursor-pointer hover:underline hover:opacity-80"
            onClick={() => removeFromCart(id)}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
}
