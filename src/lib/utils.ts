import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const replaceMultiple = (
  str: string,
  translator: Record<string, string>
) => {
  return Object.entries(translator).reduce((acc, [from, to]) => {
    const regex = new RegExp(`\\b${from}\\b`, "gi");
    return acc.replace(regex, to);
  }, str);
};

export const sentencize = (
  str: string = "",
  {
    splitter,
    joiner,
    translator = {},
  }: {
    splitter?: string;
    joiner?: string;
    translator?: Record<string, string>;
  } = {}
): string =>
  replaceMultiple(str, translator)
    .split(splitter || "_")
    .map((word) => {
      const capitalised = word === "id" ? "ID" : capitalize(word);
      return capitalised.includes(".")
        ? sentencize(capitalised, { splitter: ".", joiner: "." })
        : capitalised.includes('"')
        ? sentencize(capitalised, { splitter: '"', joiner: '"' })
        : capitalised;
    })
    .join(joiner ?? " ");
