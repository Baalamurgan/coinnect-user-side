import Confetti from "@/components/ui/confetti";
import displayPrice from "@/lib/price";
import { orderService } from "@/services/order/service";
import { notFound } from "next/navigation";

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
      <h1 className="mt-20">Your Order received successfully!🎉</h1>
      <p className="mt-5">
        We&apos;ll call you within 1-2 business days to confirm your order and
        payment details
      </p>
      <p className="mt-1">
        Total Amount:{" "}
        <span className="text-lg font-semibold">
          {displayPrice({ price: data.billable_amount })}
        </span>
      </p>
      <div className="my-10 flex flex-col items-center gap-y-3 mt-20">
        <p>If you want to chat with us, get us quickly in the below link</p>
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
