import { useCart } from "@/context/CartContext";
import displayPrice from "@/lib/price";
import { sentencize } from "@/lib/utils";
import { Cart } from "@/services/order/types";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button } from "../ui/button";
import Tag from "../ui/tag";

export const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    color: "yellow",
  },
  {
    value: "booked",
    label: "Booked",
    color: "blue",
  },
  {
    value: "paid",
    label: "Paid",
    color: "green",
  },
  {
    value: "shipped",
    label: "Shipped",
    color: "orange",
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "teal",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "red",
  },
];

const CartItems = ({ cart }: { cart: Cart }) => {
  const { setOrderSuccessModalType, removeItemFromCartHandler } = useCart();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">
      <div className="xl:col-span-2 bg-gray-100 p-6 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="text-left pb-2">PRODUCT</th>
              <th className="px-5">PRICE</th>
              <th className="px-5">QUANTITY</th>
              <th className="px-5">TOTAL</th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {cart.order_items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4 flex items-center gap-4">
                  {item.metadata?.image_url ? (
                    <Image
                      src={item.metadata.image_url}
                      alt={item.item_id}
                      width={100}
                      height={50}
                      className="rounded-lg"
                    />
                  ) : null}
                  <div>
                    <p className="text-base">{item.metadata?.name}</p>
                  </div>
                </td>
                <td className="text-center font-medium">
                  {displayPrice({
                    price: item.billable_amount / item.quantity,
                  })}
                </td>
                <td className="text-center px-5">
                  <div className="flex items-center justify-center gap-x-2 border py-1 rounded-md bg-gray-200">
                    {/* <button
                      className="text-lg font-bold"
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                    >
                      -
                    </button> */}
                    <span>{item.quantity}</span>
                    {/* <button
                      className="text-lg font-bold"
                      onClick={() => handleQuantityChange(item.id, "increase")}
                    >
                      +
                    </button> */}
                  </div>
                </td>
                <td className="text-center font-medium">
                  {displayPrice({
                    price: item.billable_amount,
                  })}
                </td>
                <td className="text-center px-5">
                  {cart.status === "pending" && (
                    <button
                      type="button"
                      onClick={() =>
                        removeItemFromCartHandler({
                          order_id: cart.id,
                          order_item_id: item.id,
                        })
                      }
                    >
                      <TrashIcon
                        className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-600"
                        title="Delete"
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg min-w-[300px] max-w-[500px] lg:w-full place-self-end xl:place-self-auto h-fit">
        <div className="flex items-center gap-x-1 mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <Tag
            color={STATUS_OPTIONS.find((s) => s.value === cart.status)?.color}
          >
            {sentencize(cart.status)}
          </Tag>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <p>Total</p>
          <div className="flex items-center gap-x-1">
            <p>{displayPrice({ price: cart.billable_amount })}</p>
            {cart.status !== "pending" && (
              <CheckBadgeIcon
                className="h-6 w-6 text-green-500"
                title={cart.status}
              />
            )}
          </div>
        </div>
        {cart.status === "pending" && (
          <div className="flex items-center mt-5">
            <Button
              className="bg-green-500 hover:bg-green-600 h-5 cursor-pointer w-fit xl:w-full self-end"
              onClick={() => setOrderSuccessModalType("confirm_order")}
            >
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
