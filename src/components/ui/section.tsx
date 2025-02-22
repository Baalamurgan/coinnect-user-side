import React, { CSSProperties, FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  innerClassName?: string;
  noMaxWidth?: boolean;
  innerStyle?: CSSProperties;
}

export default function Section({
  children,
  className,
  innerClassName,
  innerStyle,
  noMaxWidth = false,
  ...props
}): FC<Props> {
  return (
    <div
      {...props}
      className={["flex items-center justify-center px-5", className].join(" ")}
    >
      <div
        style={innerStyle}
        className={[
          `w-full ${noMaxWidth ? "" : "max-w-[1240px]"}`,
          innerClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
