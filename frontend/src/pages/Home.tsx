import Items from "../data/items.json";
import ItemCard from "../components/ItemCard";
import { useState } from "react";

export interface CartState {
  [key: number]: number;
}
export default function Home() {
  
  const [cart, setCart] = useState<CartState>({});
  console.log(cart)
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 flex-wrap justify-items-center ">
        {Items.map((item) => (
          <div key={item.uuid}>
            <ItemCard
              name={item.name}
              price={Number(item.price)}
              image={item.image}
              id={item.uuid}
              cart={cart}
              setCart={setCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
