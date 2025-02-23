import { cn } from "@/lib/utils";
import { JSX } from "react";

const Tag = ({
  color,
  className,
  children,
}: {
  color?: "green" | "yellow" | "red";
  className?: string;
  children: string | JSX.Element;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-green-400 bg-green-200 px-2 py-0.5",
        color === "green"
          ? "border-green-400 bg-green-200 text-green-800"
          : color === "yellow"
            ? "border-yellow-400 bg-yellow-200 text-yellow-800"
            : color === "red"
              ? "border-red-400 bg-red-200 text-red-800"
              : "border-black bg-black/10 text-black",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
