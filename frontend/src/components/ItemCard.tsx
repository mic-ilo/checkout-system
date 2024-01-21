import { CartState } from "../App";

interface Props {
  name: string;
  price: number;
  image: string;
  id: number;
  cart: CartState[];
  setCart: React.Dispatch<React.SetStateAction<CartState[]>>;
}

function ItemCard({ name, price, image, id, cart, setCart }: Props) {
  const itemInCart = cart.find((item) => item.id === id);
  const addItem = () => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].qty += 1;
        return updatedCart;
      } else {
        return [...prev, { id, qty: 1 }];
      }
    });
  };

  const removeItem = () => {
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
            : [
                ...prev.slice(0, existingItemIndex),
                ...prev.slice(existingItemIndex + 1),
              ];

        return updatedCart;
      }

      return prev;
    });
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(ev.target.value);
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].qty = number;

        // Remove the item if the quantity becomes less than 1
        if (number < 1) {
          return [
            ...prev.slice(0, existingItemIndex),
            ...prev.slice(existingItemIndex + 1),
          ];
        }

        return updatedCart;
      }

      return prev;
    });
  };

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
          <div className="flex flex-row justify-center">
            <button
              type="button"
              className="bg-amber-500 p-2 rounded-sm font-bold w-8"
              onClick={removeItem}
            >
              -
            </button>
            <input
              type="number"
              placeholder="Qty"
              className="border-2 w-12 text-center"
              min={1}
              value={itemInCart?.qty || 0}
              onChange={handleChange}
            />
            <button
              type="button"
              className="bg-amber-500 p-2 rounded-sm font-bold w-8"
              onClick={addItem}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="text-center bg-amber-500 w-full rounded-lg h-10"
            onClick={addItem}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
