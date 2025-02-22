"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Category } from "@/services/category/types";
import { categories } from "@/data";
import "./styles.css";
import Link from "next/link";
import { findCategoryURL } from "@/lib/category";

const CategoriesDropdown = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex items-center justify-center cursor-pointer gap-x-1 p-2">
          <button className="IconButton" aria-label="Customise options">
            <HamburgerMenuIcon />
          </button>
          <p>Categories</p>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <CategoriesListDropdown categories={categories} />
        </DropdownMenu.Content>
        {/* <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            New Tab <div className="RightSlot">⌘+T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            New Window <div className="RightSlot">⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" disabled>
            New Private Window <div className="RightSlot">⇧+⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
              More Tools
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="DropdownMenuSubContent"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className="DropdownMenuItem">
                  Save Page As… <div className="RightSlot">⌘+S</div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">
                  Create Shortcut…
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">
                  Name Window…
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenu.Separator" />
                <DropdownMenu.Item className="DropdownMenuItem">
                  Developer Tools
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.CheckboxItem
            className="DropdownMenuCheckboxItem"
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Bookmarks <div className="RightSlot">⌘+B</div>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className="DropdownMenuCheckboxItem"
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Show Full URLs
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Label className="DropdownMenuLabel">
            People
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenu.RadioItem
              className="DropdownMenuRadioItem"
              value="pedro"
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="DropdownMenuRadioItem"
              value="colm"
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content> */}
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CategoriesDropdown;

const CategoriesListDropdown = ({
  categories: categoriesProp,
  innerLoop = false,
}: {
  categories: Category[];
  innerLoop?: boolean;
}) => {
  return (
    <>
      {categoriesProp.map((category) => {
        if (!category.parent_category_id)
          return (
            <SubCategoryList key={category.id} category={category} />
            // <div key={category.id}>
            //   <DropdownMenu.Item className="DropdownMenuItem">
            //     <p className="font-semibold">{category.name}</p>
            //     {/* New Tab <div className="RightSlot">⌘+T</div> */}
            //   </DropdownMenu.Item>
            // </div>
          );
        else if (!innerLoop) return null;
        else if (
          categories.filter((c) => c.parent_category_id === category.id)
            .length > 0
        )
          return <SubCategoryList key={category.id} category={category} />;
        else
          return (
            <Link
              key={category.id}
              href={`/category/${findCategoryURL(category)}`}
            >
              <div>
                <DropdownMenu.Item className="DropdownMenuItem">
                  <p className="font-semibold">{category.name}</p>
                  {/* New Tab <div className="RightSlot">⌘+T</div> */}
                </DropdownMenu.Item>
              </div>
            </Link>
          );
      })}
    </>
  );
};

const SubCategoryList = ({ category }: { category: Category }) => {
  const subCategories = categories.filter(
    (c) => c.parent_category_id === category.id
  );

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
        <Link href={`/category/${findCategoryURL(category)}`}>
          <div
            className="flex items-center gap-x-1"
            onClick={() => console.log(category, subCategories)}
            title={`/category/${findCategoryURL(category)}`}
          >
            <p className="font-semibold">{category.name}</p>
            <div className="RightSlot">
              <ChevronRightIcon />
            </div>
          </div>
        </Link>
      </DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className="DropdownMenuSubContent"
          sideOffset={2}
          alignOffset={-5}
        >
          <CategoriesListDropdown categories={subCategories} innerLoop={true} />
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};
