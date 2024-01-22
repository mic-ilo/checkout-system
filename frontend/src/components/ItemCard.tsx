import { CartContext, CartState } from "../context/CartContext";
import { useContext } from "react";
interface Props {
  name: string;
  price: number;
  image: string;
  id: number;
  cart: CartState[];
  setCart: React.Dispatch<React.SetStateAction<CartState[]>>;
}

function ItemCard({ name, price, image, id, cart }: Props) {
  const { addItem, removeItem, handleChange, removeFromCart } =
    useContext(CartContext)!;

  const itemInCart = cart.find((item) => item.id === id);

  return (
    <div>
      <div className="w-80 relative shadow-lg">
        <div className="absolute bottom-0 bg-gray-200 w-full">
          <p className="font-bold">{name}</p>
          <p>$ {price}</p>
        </div>
        <div className=" w-full h-60 object-cover">
          <img
            src={`../src/assets/${image}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-5">
        {itemInCart ? (
          <div>
            <div className="flex flex-row justify-center">
              <button
                type="button"
                className="bg-amber-500 p-2 rounded-sm font-bold w-8"
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
                type="button"
                className="bg-amber-500 p-2 rounded-sm font-bold w-8"
                onClick={() => addItem(id)}
              >
                +
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="0 text-blue-800 p-2  text-sm font-bold hover:underline hover:opacity-80"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="text-center bg-amber-500 w-full rounded-lg h-10"
            onClick={() => addItem(id)}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
