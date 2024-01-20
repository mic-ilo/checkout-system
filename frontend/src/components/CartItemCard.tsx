import { useEffect } from "react";

interface Props {
  name: string;
  price: number;
  qty: number;
  image: string;
  setTotal: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CartItemCard({
  name,
  price,
  qty,
  image,
  setTotal,
}: Props) {
  const totalPerItem: (price: number, qty: number) => number = (price, qty) => {
    const total = price * qty;
    return Number(total.toFixed(2));
  };

  useEffect(() => {
    setTotal((prevTotal) => [...prevTotal, totalPerItem(price, qty)]);
  }, [price, qty, setTotal]);

  return (
    <div className='w-full p-5' >
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
            <span className="font-bold">Quantity:</span> {qty}
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
