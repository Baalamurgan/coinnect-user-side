"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { authService } from "@/services/auth/service";
import { orderService } from "@/services/order/service";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import Checkbox from "../ui/checkbox";
import Confetti from "../ui/confetti";
import Modal from "../ui/modal";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Enter your username",
  }),
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z
    .string()
    .min(1, { message: "Enter a valid phone number" })
    .max(10, { message: "Enter a valid phone number" }),
  address_line_1: z.string().min(1, { message: "Enter a valid address" }),
  address_line_2: z.string().min(1, { message: "Enter a valid address" }),
  address_line_3: z.string().min(1, { message: "Enter a valid address" }),
  state: z.string().min(1, { message: "Enter your state" }),
  pin: z.string().min(1, { message: "Enter your PIN code" }),
  terms: z.boolean(),
});

type UserFormValue = z.infer<typeof formSchema>;

const ItemAddedToCartModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [loading, startTransition] = useTransition();
  const { cart, setCart, orderSuccessModalType, setOrderSuccessModalType } =
    useCart();
  const { user, setUser } = useAuth();

  const defaultValues = {
    username: user?.username || "",
    email: user?.email || "",
    phone: "",
    address_line_1: user?.address_line_1 || "",
    address_line_2: user?.address_line_2 || "",
    address_line_3: user?.address_line_3 || "",
    state: user?.state || "",
    pin: user?.pin || "",
    terms: false,
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    if (!data.terms || !cart)
      return toast.error(
        "Please agree to the terms and conditions to proceed."
      );

    startTransition(async () => {
      let user_id = user?.id || null;
      if (!user) {
        const response = await authService.signup(
          {
            email: data.email,
            password: "New@1234",
            username: data.username,
            phone: data.phone,
            address_line_1: data.address_line_1,
            address_line_2: data.address_line_2,
            address_line_3: data.address_line_3,
            state: data.state,
            pin: data.pin,
          },
          {}
        );
        if (response.error) {
          toast.error("Error signing up");
          // DOUBT: If the user enters another email
          // if (response.error.response?.data.message === 'user already exists') {
          //   const response = await authService.fetchProfileByEmail({
          //     email: data.email
          //   });
          //   if (response.error) {
          //     return toast.error('Error signing up');
          //   } else if (response.data) {
          //     setUser(response.data);
          //     user_id = response.data.id;
          //   }
          // }
        } else if (response.data) {
          setUser(response.data);
          user_id = response.data.id;
        }
      } else if (
        user_id &&
        (user.email !== data.email ||
          user.phone !== data.phone ||
          user.username !== data.username ||
          user.phone !== data.phone ||
          user.address_line_1 !== data.address_line_1 ||
          user.address_line_2 !== data.address_line_2 ||
          user.address_line_3 !== data.address_line_3 ||
          user.state !== data.state ||
          user.pin !== data.pin)
      ) {
        await authService
          .updateProfile(
            {
              username: data.username,
              email: data.email,
              phone: data.phone,
              address_line_1: data.address_line_1,
              address_line_2: data.address_line_2,
              address_line_3: data.address_line_3,
              state: data.state,
              pin: data.pin,
            },
            {},
            {
              user_id,
            }
          )
          .then(() => {
            setUser((p) =>
              p
                ? {
                    ...p,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                  }
                : null
            );
            toast.success("Updated user profile");
          })
          .catch(() => toast.success("Error updating profile"));
      }

      if (!user_id || !cart)
        toast.error("Something went wrong. Please try again");
      else {
        const response = await orderService.confirm(
          {
            user_id,
          },
          {},
          {
            order_id: cart.id,
          }
        );
        if (response.error)
          toast.error("Something went wrong. Please try again");
        else if (response.data) {
          setOrderSuccessModalType("");
          localStorage.removeItem("order_id");
          setCart(null);
          toast.success("Order confirmed");
          push(`/success/${cart.id}`);
        }
      }
    });
  };

  const onError: SubmitErrorHandler<UserFormValue> = async (error) =>
    console.log(error);

  useEffect(() => {
    if (user) {
      form.reset((p) => ({
        ...p,
        email: user.email,
        username: user.username,
        phone: user.phone || "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!cart || user === undefined) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Portal forceMount>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className={`DialogContent !bg-white !overflow-hidden`}>
          <Dialog.Title className="text-xl font-medium">
            {orderSuccessModalType === "add_item"
              ? "Item added to cart!"
              : "Confirm your order"}
          </Dialog.Title>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-2 mt-4 flex flex-col gap-y-3"
            >
              {orderSuccessModalType === "confirm_order" ? (
                <div className="overflow-auto max-h-[400px] py-3">
                  <div className="space-y-2 flex flex-col gap-y-3">
                    <p className="text-sm font-medium mt-2">
                      Enter your details
                    </p>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-[80%] ml-1"
                              type="text"
                              placeholder="Enter your username"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-[80%] ml-1"
                              type="email"
                              placeholder="Enter your email"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-x-2">
                              <p className="font-medium">+91</p>
                              <Input
                                className="w-[72.5%]"
                                type="number"
                                placeholder="987-654-3210"
                                disabled={loading}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address_line_1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1*</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-[80%] ml-1"
                              placeholder="Enter your address line 1"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address_line_2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-[80%] ml-1"
                              placeholder="Enter your address line 2"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address_line_3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 3</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-[80%] ml-1"
                              placeholder="Enter your address line 3"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State*</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-[80%] ml-1"
                              placeholder="Enter your state"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN code*</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-[80%] ml-1"
                              placeholder="Enter your PIN code"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Confetti spread={40} />
                  <CheckCircleIcon className="text-green-400 h-20 w-20" />
                </div>
              )}
              {orderSuccessModalType === "confirm_order" && (
                <FormField
                  control={form.control}
                  name="terms"
                  render={() => (
                    <FormItem className="!mt-3">
                      <FormControl>
                        <Checkbox
                          id="t&c"
                          label={
                            "I agree to be contacted by a representative for order confirmation"
                          }
                          labelClassName="max-w-[400px]"
                          value={form.getValues("terms") ? "true" : "false"}
                          onCheckedChange={(value: boolean) =>
                            form.setValue("terms", value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex items-center justify-between w-full !mt-8">
                <Dialog.Close
                  asChild
                  onClick={() => {
                    push(`/category/${pathname.split("/")[2]}` || "/");
                  }}
                >
                  <Button
                    className="h-5 cursor-pointer"
                    variant="outline"
                    type="button"
                  >
                    {orderSuccessModalType === "add_item"
                      ? "Continue shopping"
                      : "View Cart"}
                  </Button>
                </Dialog.Close>
                <div className="flex items-center justify-end w-full gap-x-6">
                  {orderSuccessModalType === "add_item" ? (
                    <div
                      onClick={() => {
                        setOrderSuccessModalType("");
                        push(`/cart`);
                      }}
                    >
                      <Button
                        className="h-5 cursor-pointer"
                        variant="secondary"
                        type="button"
                      >
                        View Cart
                      </Button>
                    </div>
                  ) : (
                    <div className="my-3 place-self-end">
                      <Button className="h-5 cursor-pointer">
                        Confirm Order
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Form>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Modal>
  );
};

export default ItemAddedToCartModal;
