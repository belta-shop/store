import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils/style-functions";

const logo = (scale: number) => ({
  icon: {
    src: "/assets/logo/logo-icon.svg",
    width: 40 * scale,
    height: 40 * scale,
  },
  full: {
    src: "/assets/logo/logo-full.svg",
    width: 300 * scale,
    height: 60 * scale,
  },
});

interface Props {
  full?: boolean;
  scale?: number;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Logo({
  full = false,
  scale = 1,
  href,
  className = "",
  style,
}: Props) {
  const img = full ? logo(scale).full : logo(scale).icon;
  const containerClass = cn("inline-flex items-center", className);

  if (href) {
    return (
      <Link
        href={href}
        className={containerClass}
        style={{ aspectRatio: img.width / img.height, ...style }}
      >
        <Image alt="beltashop" {...img} style={{ maxWidth: "100%" }} />
      </Link>
    );
  }

  return (
    <div
      className={containerClass}
      style={{ aspectRatio: img.width / img.height, ...style }}
    >
      <Image alt="beltashop" {...img} style={{ maxWidth: "100%" }} />
    </div>
  );
}
