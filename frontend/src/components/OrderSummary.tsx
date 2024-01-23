import { Link } from "react-router-dom";

interface Props {
  totalAmount: number;
}

export default function OrderSummary({ totalAmount }: Props) {
  const discount = (amount: number) => {
    if (amount > 100) {
      return "20% off on total greater than $100";
    } else if (amount > 50) {
      return "15% off on total greater than $50";
    } else if (amount > 20) {
      return "10% off on total greater than $20";
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
      return (amount * 0.9).toFixed(2);
    } else {
      return amount;
    }
  };

  return (
    <div className=" bg-slate-200 h-fit p-5 bg-opacity-45 rounded-lg text-gray-700">
      <h2 className=" text-2xl text-center font-light pb-5">Order summary</h2>
      <p className="">
        <span className="font-bold">Sub total: </span>$ {totalAmount}
      </p>
      <p>
        <span className="font-bold">Discount applied: </span>
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
  );
}
