"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Profile } from "@/services/auth/types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import * as React from "react";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import Section from "../ui/section";
import CategoriesDropdown from "./navbar/categories-navbar";

const Navbar = ({ user }: { user: Profile | null }) => {
  const navItems: {
    label?: string;
    icon?: React.JSX.Element;
    link?: string;
    dropdown?: React.JSX.Element;
    Component?: React.JSX.Element;
  }[] = [
    {
      Component: <CategoriesDropdown />,
    },
    //   {label: "Category",
    //   icon: <HamburgerMenuIcon />,
    //   link: "",
    //   dropdown: <CategoriesDropdown />,
    // },
    {
      label: "Home",
      link: "/",
    },
    {
      label: "About us",
      link: "/about-us",
    },
  ];
  const { cart } = useCart();

  return (
    <Section className="">
      <nav className="flex items-center justify-between px-10">
        <div className="flex items-center max-h-[60px] min-h-[60px] h-full gap-x-10 w-full">
          <Logo />
          {navItems.map((navItem, i) => {
            return (
              <div key={i} className="hover:bg-gray-200">
                {navItem.Component ? (
                  <>{navItem.Component}</>
                ) : navItem.link ? (
                  <Link href={navItem.link}>
                    <div
                      className={cn(
                        "flex items-center justify-center hover:bg-gray-200 h-full cursor-pointer relative group p-2"
                      )}
                    >
                      {navItem.icon && (
                        <div className="pr-1">{navItem.icon}</div>
                      )}
                      <p>{navItem.label}</p>
                      <div className="hidden group-hover:block absolute top-0 left-0 pt-7">
                        {navItem.dropdown && <>abcd - {navItem.dropdown}</>}
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-x-5">
          <Link href={`/cart`} className="hover:text-blue-600">
            <div className="relative">
              <ShoppingCartIcon className="h-8 w-8" />
              <div className="absolute -top-2 -right-2 bg-blue-500 h-4 w-4 rounded-full flex items-center justify-center p-3">
                <p className="text-white">
                  {cart?.order_items ? cart?.order_items.length : 0}
                </p>
              </div>
            </div>
          </Link>
          {user ? (
            <div className="relative group">
              <div
                className="flex items-center justify-center p-3 rounded-full border border-blue-500 h-10 w-10 hover:bg-blue-300"
                title={user.username}
              >
                <p className="text-blue-800 capitalize">{user.username[0]}</p>
              </div>
              <div className="hidden group-hover:flex absolute top-0 right-0 lg:-right-20 mt-8 pt-2">
                <div className="bg-white rounded-md group-hover flex flex-col gap-y-3 p-5 shadow-lg">
                  <p>
                    <span className="font-semibold">Name:</span> {user.username}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </Section>
    // <DropdownMenu.Root>
    //   <DropdownMenu.Trigger asChild>
    //     <button className="IconButton" aria-label="Customise options">
    //       <HamburgerMenuIcon />
    //     </button>
    //   </DropdownMenu.Trigger>

    //   <DropdownMenu.Portal>
    //     <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
    //       <DropdownMenu.Item className="DropdownMenuItem">
    //         New Tab <div className="RightSlot">⌘+T</div>
    //       </DropdownMenu.Item>
    //       <DropdownMenu.Item className="DropdownMenuItem">
    //         New Window <div className="RightSlot">⌘+N</div>
    //       </DropdownMenu.Item>
    //       <DropdownMenu.Item className="DropdownMenuItem" disabled>
    //         New Private Window <div className="RightSlot">⇧+⌘+N</div>
    //       </DropdownMenu.Item>
    //       <DropdownMenu.Sub>
    //         <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
    //           More Tools
    //           <div className="RightSlot">
    //             <ChevronRightIcon />
    //           </div>
    //         </DropdownMenu.SubTrigger>
    //         <DropdownMenu.Portal>
    //           <DropdownMenu.SubContent
    //             className="DropdownMenuSubContent"
    //             sideOffset={2}
    //             alignOffset={-5}
    //           >
    //             <DropdownMenu.Item className="DropdownMenuItem">
    //               Save Page As… <div className="RightSlot">⌘+S</div>
    //             </DropdownMenu.Item>
    //             <DropdownMenu.Item className="DropdownMenuItem">
    //               Create Shortcut…
    //             </DropdownMenu.Item>
    //             <DropdownMenu.Item className="DropdownMenuItem">
    //               Name Window…
    //             </DropdownMenu.Item>
    //             <DropdownMenu.Separator className="DropdownMenu.Separator" />
    //             <DropdownMenu.Item className="DropdownMenuItem">
    //               Developer Tools
    //             </DropdownMenu.Item>
    //           </DropdownMenu.SubContent>
    //         </DropdownMenu.Portal>
    //       </DropdownMenu.Sub>

    //       <DropdownMenu.Separator className="DropdownMenuSeparator" />

    //       <DropdownMenu.CheckboxItem
    //         className="DropdownMenuCheckboxItem"
    //         checked={bookmarksChecked}
    //         onCheckedChange={setBookmarksChecked}
    //       >
    //         <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
    //           <CheckIcon />
    //         </DropdownMenu.ItemIndicator>
    //         Show Bookmarks <div className="RightSlot">⌘+B</div>
    //       </DropdownMenu.CheckboxItem>
    //       <DropdownMenu.CheckboxItem
    //         className="DropdownMenuCheckboxItem"
    //         checked={urlsChecked}
    //         onCheckedChange={setUrlsChecked}
    //       >
    //         <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
    //           <CheckIcon />
    //         </DropdownMenu.ItemIndicator>
    //         Show Full URLs
    //       </DropdownMenu.CheckboxItem>

    //       <DropdownMenu.Separator className="DropdownMenuSeparator" />

    //       <DropdownMenu.Label className="DropdownMenuLabel">
    //         People
    //       </DropdownMenu.Label>
    //       <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
    //         <DropdownMenu.RadioItem
    //           className="DropdownMenuRadioItem"
    //           value="pedro"
    //         >
    //           <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
    //             <DotFilledIcon />
    //           </DropdownMenu.ItemIndicator>
    //           Pedro Duarte
    //         </DropdownMenu.RadioItem>
    //         <DropdownMenu.RadioItem
    //           className="DropdownMenuRadioItem"
    //           value="colm"
    //         >
    //           <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
    //             <DotFilledIcon />
    //           </DropdownMenu.ItemIndicator>
    //           Colm Tuite
    //         </DropdownMenu.RadioItem>
    //       </DropdownMenu.RadioGroup>

    //       <DropdownMenu.Arrow className="DropdownMenuArrow" />
    //     </DropdownMenu.Content>
    //   </DropdownMenu.Portal>
    // </DropdownMenu.Root>
  );
};

export default Navbar;
