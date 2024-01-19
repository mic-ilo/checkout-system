import { useState } from "react";

interface Props {
  name: string;
  price: number;
  image: string;
}

function ItemCard({ name, price, image }: Props) {
  const [count, setCount] = useState<number>(0);

  const addItem = () => setCount(count + 1);

  const removeItem = () => setCount(count - 1);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(ev.target.value);
    setCount(number);
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
        {count > 0 ? (
          <div className="flex flex-row justify-center">
            <button
              type="button"
              className="bg-amber-500 p-2 rounded-sm font-bold w-8"
              onClick={addItem}
            >
              +
            </button>
            <input
              type="number"
              placeholder="Qty"
              className="border-2 w-12 text-center"
              min={0}
              onChange={handleChange}
              value={count}
            />
            <button
              type="button"
              className="bg-amber-500 p-2 rounded-sm font-bold w-8"
              onClick={removeItem}
            >
              -
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
