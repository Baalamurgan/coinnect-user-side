"use client";

import Loader from "@/components/loader";
import { useConstants } from "@/context/ConstantsContext";
import { findCategoryURL } from "@/lib/category";
import { Category } from "@/services/category/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import "./styles.css";

const CategoriesDropdown = () => {
  const { categories: allCategories } = useConstants();
  // const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  // const [urlsChecked, setUrlsChecked] = React.useState(false);
  // const [person, setPerson] = React.useState("pedro");

  if (!allCategories) return <Loader />;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex items-center justify-center gap-x-1.5 cursor-pointer p-2">
          <button aria-label="Customise options">
            <HamburgerMenuIcon className="text-black" />
          </button>
          <p>Categories</p>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <CategoriesListDropdown
            categories={allCategories}
            allCategories={allCategories}
          />
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
  allCategories,
  innerLoop = false,
}: {
  categories: Category[];
  allCategories: Category[];
  innerLoop?: boolean;
}) => {
  return (
    <>
      {categoriesProp.map((category) => {
        if (!category.parent_category_id)
          return (
            <SubCategoryList
              key={category.id}
              category={category}
              allCategories={allCategories}
            />
            // <div key={category.id}>
            //   <DropdownMenu.Item className="DropdownMenuItem">
            //     <p className="font-semibold">{category.name}</p>
            //     {/* New Tab <div className="RightSlot">⌘+T</div> */}
            //   </DropdownMenu.Item>
            // </div>
          );
        else if (!innerLoop) return null;
        else if (
          allCategories.filter((c) => c.parent_category_id === category.id)
            .length > 0
        )
          return (
            <SubCategoryList
              key={category.id}
              category={category}
              allCategories={allCategories}
            />
          );
        else
          return (
            <Link
              key={category.id}
              href={`/category/${findCategoryURL(category, allCategories)}`}
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

const SubCategoryList = ({
  category,
  allCategories,
}: {
  category: Category;
  allCategories: Category[];
}) => {
  const subCategories = allCategories.filter(
    (c) => c.parent_category_id === category.id
  );

  return (
    <DropdownMenu.Sub>
      <Link href={`/category/${findCategoryURL(category, allCategories)}`}>
        <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
          <div
            className="flex items-center gap-x-1"
            title={`/category/${findCategoryURL(category, allCategories)}`}
          >
            <p className="font-semibold">{category.name}</p>
            <div className="RightSlot">
              <ChevronRightIcon />
            </div>
          </div>
        </DropdownMenu.SubTrigger>
      </Link>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className="DropdownMenuSubContent"
          sideOffset={2}
          alignOffset={-5}
        >
          <CategoriesListDropdown
            categories={subCategories}
            allCategories={allCategories}
            innerLoop={true}
          />
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};
