import React from "react";
import Image from "next/image";
import { Cart } from "@/services/order/types";
import displayPrice from "@/lib/price";

const CartItems = ({ cart }: { cart: Cart }) => {
  console.log(cart);

  const handleQuantityChange = (id: string, type: "increase" | "decrease") => {
    console.log(`Updating quantity for ${id}: ${type}`);
  };

  const handleRemove = (id: string) => {
    console.log(`Removing item ${id}`);
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="text-left pb-2">PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.order_items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4 flex items-center gap-4">
                  <Image
                    src={""}
                    alt={item.item_id}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">Product {item.item_id}</p>
                  </div>
                </td>
                <td className="text-center font-medium">
                  {displayPrice({ price: item.billable_amount })}
                </td>
                <td className="text-center">
                  <div className="flex items-center gap-2 border px-3 py-1 rounded-md bg-gray-200">
                    <button
                      className="text-lg font-bold"
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-lg font-bold"
                      onClick={() => handleQuantityChange(item.id, "increase")}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-center font-medium">
                  {displayPrice({
                    price: item.billable_amount * item.quantity,
                  })}
                </td>
                <td className="text-center">
                  <button
                    className="text-red-500 text-lg"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {/* <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>{displayPrice({ price: cart. })}</span>
        </div> */}
        {/* <div className="flex justify-between py-2 text-red-500">
          <span>Discount (-20%)</span>
          <span>- {displayPrice({ price: discount })}</span>
        </div> */}
        {/* <div className="flex justify-between py-2">
          <span>Delivery Fee</span>
          <span>{displayPrice({ price: deliveryFee })}</span>
        </div> */}
        {/* <hr className="my-3" /> */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{displayPrice({ price: cart.billable_amount })}</span>
        </div>
        <div className="mt-5 flex items-center">
          <input
            type="text"
            placeholder="Add promo code"
            className="w-full px-3 py-2 border rounded-l-md outline-none"
          />
          <button className="bg-black text-white px-4 py-2 rounded-r-md">
            Apply
          </button>
        </div>
        <button className="w-full mt-5 bg-yellow-400 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500">
          Go to Checkout →
        </button>
      </div>
    </div>
  );
};

export default CartItems;
