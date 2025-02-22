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
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Loader from "../loader";
import { Button } from "../ui/button";
import Checkbox from "../ui/checkbox";
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
  const [loading, startTransition] = useTransition();
  const { cart } = useCart();
  const { user, fetchProfile } = useAuth();

  const defaultValues = {
    username: user?.username || "",
    email: user?.email || "",
    phone: "",
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
      console.log({ data });
      let user_id = "";
      if (user?.id) {
        await authService
          .updateProfile(
            {
              username: data.username,
              email: data.email,
              phone: data.phone,
            },
            {},
            {
              user_id: user.id,
            }
          )
          .then(() => (user_id = user.id));
      } else {
        await authService
          .signup(
            {
              email: data.email,
              password: "New@1234",
              username: data.username,
            },
            {}
          )
          .then((res) => {
            if (res.data) user_id = res.data.id;
          });
      }
      const newUser = await fetchProfile(user_id);
      if (!newUser) toast.error("Something went wrong. Please try again");
      else {
        const response = await orderService.confirm(
          {
            user_id: newUser.id,
          },
          {},
          {
            order_id: cart?.id,
          }
        );
        if (response.error)
          toast.error("Something went wrong. Please try again");
        else if (response.data) {
          //   push(`/success`);
          toast.success("Order confirmed");
        }
      }
    });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        username: user.username,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!cart || user === undefined) return <Loader />;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Portal forceMount>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent !bg-white !overflow-auto ">
          <Dialog.Title className="text-xl font-medium">
            Item added to cart!
          </Dialog.Title>
          <Dialog.Description className="text-sm font-medium mt-2">
            Would you like to enter your details?
          </Dialog.Description>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 mt-8 flex flex-col gap-y-3"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[80%]"
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[80%]"
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">+91</p>
                        <Input
                          className="w-[80%]"
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
                name="phone"
                render={() => (
                  <FormItem className="!mt-5">
                    <FormControl>
                      <Checkbox
                        id="t&c"
                        label={
                          "I agree to be contacted by a representative to confirm my order."
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
              <div className="flex items-center justify-between w-full !mt-8">
                <Dialog.Close asChild>
                  <Button
                    className="h-5 cursor-pointer"
                    variant="outline"
                    type="button"
                  >
                    Continue shopping
                  </Button>
                </Dialog.Close>
                <div className="flex items-center justify-end w-full gap-x-6">
                  <div onClick={() => push(`/cart`)}>
                    <Button
                      className="h-5 cursor-pointer"
                      variant="secondary"
                      type="button"
                    >
                      View Cart
                    </Button>
                  </div>
                  {/* <Dialog.Close asChild> */}
                  <Button className="h-5 cursor-pointer">Confirm Order</Button>
                  {/* </Dialog.Close> */}
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
