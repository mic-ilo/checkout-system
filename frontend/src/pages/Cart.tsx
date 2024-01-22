import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import dataDB from "../data/items.json";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import OrderSummary from "../components/OrderSummary";

export default function Cart() {
  const [cart, setCart] = useContext(CartContext)!.cartState;
  const [total, setTotal] = useState<{ id: number; total: number }[]>([]);

  const totalAmount = total
    .reduce((acc, curr) => acc + curr.total, 0)
    .toFixed(2);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart !== null) {
      const items = JSON.parse(storedCart);
      setCart(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsInCart = dataDB.filter((item) =>
    cart.some((cartItem) => cartItem.id === item.uuid)
  );

  return (
    <div className="max-w-7xl mx-auto p-3">
      <h1 className="text-2xl md:4-xl font-light md:text-4xl  mt-5 mb-5">
        Shopping Cart
      </h1>
      {cart.length ? (
        <div className="md:flex">
          <div className="md:w-2/3 w-full">
            {itemsInCart.map((item) => {
              const cartItem = cart.find(
                (cartItem) => cartItem.id === item.uuid
              );

              return (
                <div key={item.uuid}>
                  <CartItemCard
                    name={item.name}
                    price={Number(item.price)}
                    qty={cartItem ? cartItem.qty : 0}
                    image={item.image}
                    setTotal={setTotal}
                    id={item.uuid}
                  />
                </div>
              );
            })}
          </div>
          <div className="md:w-1/3">
            <OrderSummary totalAmount={Number(totalAmount)} />
          </div>
        </div>
      ) : (
        <p>
          No items in the cart.{" "}
          <Link to="/" className="underline text-amber-500 font-bold">
            Browse items
          </Link>
        </p>
      )}
    </div>
  );
}
