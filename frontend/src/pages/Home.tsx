import Items from "../data/items.json";
import ItemCard from "../components/ItemCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";

export default function Home() {
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart !== null) {
      const items = JSON.parse(storedCart);
      setCart(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
