import { cn } from "@/lib/utils";
import { JSX } from "react";

const Tag = ({
  color,
  className,
  children,
}: {
  color?: "green" | "yellow" | "red" | "blue" | "orange" | "teal" | string;
  className?: string;
  children: string | JSX.Element;
}) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center justify-center rounded-lg border px-2 py-0.5 text-sm font-medium",
        color === "green"
          ? "border-green-400 bg-green-200 text-green-800 hover:bg-green-600/50"
          : color === "yellow"
            ? "border-yellow-400 bg-yellow-200 text-yellow-800 hover:bg-yellow-600/50"
            : color === "red"
              ? "border-red-400 bg-red-200 text-red-800 hover:bg-red-600/50"
              : color === "blue"
                ? "border-blue-400 bg-blue-200 text-blue-800 hover:bg-blue-600/50"
                : color === "orange"
                  ? "border-orange-400 bg-orange-200 text-orange-800 hover:bg-orange-600/50"
                  : color === "teal"
                    ? "border-teal-400 bg-teal-200 text-teal-800 hover:bg-teal-600/50"
                    : "border-gray-400 bg-gray-200 text-gray-800 hover:bg-gray-600/50",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
