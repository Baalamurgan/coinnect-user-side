"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import CategoriesDropdown from "./navbar/CategoriesDropdown";

const Navbar = () => {
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

  return (
    <div className="flex items-center max-h-[60px] min-h-[60px] h-full gap-x-10 w-full px-5">
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
                  {navItem.icon && <div className="pr-1">{navItem.icon}</div>}
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
