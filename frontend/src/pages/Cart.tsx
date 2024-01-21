import { useContext } from "react";
import { CartContext } from "../App";
import dataDB from "../data/items.json";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const [total, setTotal] = useState<number[]>([]);
  const totalAmount = total.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  console.log(total);

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

  const discount = (amount: number) => {
    if (amount > 100) {
      return "20% discount voucher applied";
    } else if (amount > 50) {
      return "15% discount voucher applied";
    } else if (amount > 20) {
      return "10% discount applied";
    } else {
      return "no discount voucher applied";
    }
  };

  const grandTotal = (amount: number) => {
    if (amount > 100) {
      return (amount * 0.8).toFixed(2);
    } else if (amount > 50) {
      return (amount * 0.85).toFixed(2);
    } else if (amount > 20) {
      return (amount * 0.1).toFixed(2);
    } else {
      return amount;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3">
      <h1 className="text-3xl text-center mt-5">My Cart</h1>
      {cart.length ? (
        <div className="md:flex">
          <div className="md:w-3/4 w-full">
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
                  />
                </div>
              );
            })}
          </div>
          <div className="md:w-1/4 bg-amber-500">
            <h2 className="text-xl">Order summary</h2>
            <p className="text-lg">
              <span>Total Amount: </span>
              {totalAmount}
            </p>
            <p>Discount: {discount(Number(totalAmount))} </p>
            <p>Grand total: {grandTotal(Number(totalAmount))}</p>
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
