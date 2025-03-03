"use client";
import { Button } from "@/components/ui/button";
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
import { authService } from "@/services/auth/service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Loader from "../loader";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Enter your name",
  }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Enter a valid password" }),
  phone: z
    .string()
    .min(1, { message: "Enter a valid phone number" })
    .max(10, { message: "Enter a valid phone number" }),
  address_line_1: z.string().min(1, { message: "Enter a valid address" }),
  address_line_2: z.string(),
  address_line_3: z.string(),
  state: z.string().min(1, { message: "Enter your state" }),
  pin: z.string().min(1, { message: "Enter your PIN code" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthSignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, startTransition] = useTransition();
  const { push } = useRouter();
  const { user, fetchProfile } = useAuth();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    state: "",
    pin: "",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const response = await authService.signup(
        {
          email: data.email,
          username: data.username,
          password: data.password,
          phone: data.phone,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          address_line_3: data.address_line_3,
          pin: data.pin,
          state: data.state,
        },
        {}
      );
      if (response.error)
        toast.error(
          response?.error.response?.data?.message || "Error signing up"
        );
      else if (response.data) {
        await fetchProfile(response.data.id);
        push(callbackUrl ?? "/home");
        toast.success(`Signed up ${data.email} successfully`);
      }
    });
  };

  useEffect(() => {
    if (user) push(`/home`);
  }, [user, push]);

  if (user || user === undefined) return <Loader />;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input
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
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
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
                  Phone Number *
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-2">
                    <p className="font-medium">+91</p>
                    <Input
                      className="w-full"
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
                    placeholder="Enter your PIN code"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Create Account
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Link href="/login">
        <Button
          disabled={loading}
          className="ml-auto w-full"
          type="submit"
          variant={"secondary"}
        >
          Login
        </Button>
      </Link>
    </>
  );
}
