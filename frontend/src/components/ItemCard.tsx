import { CartState } from "../pages/Home";
interface Props {
  name: string;
  price: number;
  image: string;
  id: number;
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
}

function ItemCard({ name, price, image, id, cart, setCart }: Props) {
  const addItem = () => {
    if (id in cart) {
      setCart((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1,
      }));
    } else {
      setCart((prev) => ({ ...prev, [id]: 1 }));
    }
  };

  const removeItem = () => {
    if (id in cart) {
      setCart((prev) => {
        const updatedCart = { ...prev };
        const newQuantity = (prev[id] ?? 1) - 1;

        if (newQuantity > 0) {
          updatedCart[id] = newQuantity;
        } else {
          delete updatedCart[id];
        }
        return updatedCart;
      });
    }
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(ev.target.value);
    setCart((prev) => ({
      ...prev,
      [id]: number,
    }));
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
        {cart[id] ? (
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
              min={0}
              value={cart[id]}
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
