import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import dataDB from "../data/items.json";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useContext(CartContext)!.cartState;
  const [total, setTotal] = useState<number[]>([]);
  const totalAmount = total.reduce((acc, curr) => acc + curr, 0).toFixed(2);

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
      return "20% voucher applied";
    } else if (amount > 50) {
      return "15% voucher applied";
    } else if (amount > 20) {
      return "10% discount applied";
    } else {
      return "no voucher applied";
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
          <div className="md:w-1/3 bg-slate-200 h-fit p-5 bg-opacity-45 rounded-lg text-gray-700">
            <h2 className=" text-2xl text-center font-light pb-5">
              Order summary
            </h2>
            <p className="">
              <span className="font-bold">Sub total: </span>$ {totalAmount}
            </p>
            <p>
              <span className="font-bold">Discount: </span>
              {discount(Number(totalAmount))}{" "}
            </p>
            <p>
              <span className="font-bold">Total: </span> ${" "}
              {grandTotal(Number(totalAmount))}
            </p>
            <button
              type="button"
              className=" mt-5 bg-amber-500 font-bold text-black p-2 rounded-lg w-full"
            >
              PROCEED TO CHECKOUT
            </button>
            <Link
              to="/"
              type="button"
              className=" mt-5 bg-slate-300 font-bold text-black text-center p-2 rounded-lg w-full"
            >
              CONTINUE SHOPPING {">>"}
            </Link>
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
