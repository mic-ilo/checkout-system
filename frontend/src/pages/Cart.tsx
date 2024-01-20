import { useContext } from "react";
import { CartContext } from "../App";
import dataDB from "../data/items.json";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const [cart] = useContext(CartContext);
  const [total, setTotal] = useState<number[]>([]);
  const totalAmount = total.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  console.log(total);

  const itemsInCart = dataDB.filter((item) =>
    cart.some((cartItem) => cartItem.id === item.uuid)
  );

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-10">
      <h1 className="text-3xl font-bold underline text-center mt-10">
        ADDED TO CART
      </h1>
      {cart.length ? (
        <div>
          {itemsInCart.map((item) => {
            const cartItem = cart.find((cartItem) => cartItem.id === item.uuid);

            return (
              <div key={item.uuid}>
                <CartItemCard
                  name={item.name}
                  price={Number(item.price)}
                  qty={cartItem ? cartItem.qty : 0}
                  image={item.image}
                  setTotal={setTotal}
                />
              </div>
            );
          })}
          <p>Total Amount: {totalAmount}</p>
        </div>
      ) : (
        <p>
          No items in the cart.{" "}
          <Link to="/" className="underline text-yellow-500 font-bold">
            Browse items
          </Link>
        </p>
      )}
    </div>
  );
}
