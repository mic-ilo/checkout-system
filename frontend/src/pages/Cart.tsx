import { useContext } from "react";
import { CartContext } from "../App";
import dataDB from "../data/items.json";

export default function Cart() {
  const [cart] = useContext(CartContext);

  const itemsInCart = dataDB.filter((item) => cart.some((cartItem) => cartItem.id === item.uuid))

  return (
    <div>
    {itemsInCart.map((item) => {
      const cartItem = cart.find((cartItem) => cartItem.id === item.uuid);

      return (
        <div key={item.uuid}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>Quantity: {cartItem && cartItem.qty}</p>
        </div>
      );
    })}
  </div>
  )
}
