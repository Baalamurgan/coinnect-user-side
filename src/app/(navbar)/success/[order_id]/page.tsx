import Confetti from "@/components/ui/confetti";
import displayPrice from "@/lib/price";
import { orderService } from "@/services/order/service";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default async function Page({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const order_id = (await params).order_id;

  const { data } = await orderService.getById(
    {},
    {},
    {
      order_id,
    }
  );

  if (!data) return notFound();

  return (
    <div className="flex flex-col items-center justify-center">
      <Confetti />
      <h1 className="mt-20">🎉 Your order has been received successfully!</h1>
      <p className="mt-5">
        We&apos;ll contact you within 1-2 business days to confirm your order
        and payment details
      </p>
      <p className="mt-1">
        <span className="text-lg font-semibold">Total Amount: </span>
        {displayPrice({ price: data.billable_amount })}
      </p>
      <Link href={`/cart/${order_id}`} className="hover:text-blue-600">
        <div className="my-10 flex items-center gap-x-2 mt-20">
          <p>View Cart</p>
          <ShoppingCartIcon className="h-5 w-5" />
        </div>
      </Link>
      <div className="my-10 flex flex-col items-center gap-y-3 mt-20">
        <p>Need assistance? Chat with us instantly using the link below.</p>
        <a
          href={`https://wa.me/9444975758`}
          className="text-blue-600 underline"
        >
          Chat with us!
        </a>
      </div>
    </div>
  );
}
