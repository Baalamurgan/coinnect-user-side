import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  height = 70,
  width = 174,
}: {
  height?: number;
  width?: number;
}) => (
  <Link href="/">
    <Image src="/logo.svg" alt="logo" height={height} width={width} priority />
  </Link>
);
