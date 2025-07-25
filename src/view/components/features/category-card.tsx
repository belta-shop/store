import Link from "next/link";
import Image from "next/image";

import { paths } from "@/lib/config/paths";
import { Category } from "@/lib/types/api/categories";

export default function CategoryCard({
  category: { _id, cover, name },
}: {
  category: Category;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition-shadow duration-300 hover:shadow-2xl">
      <Link
        href={paths.category(_id)}
        className="relative block aspect-square h-auto"
      >
        <Image
          src={cover}
          alt={name}
          fill
          className="block h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, 200px"
          loading="lazy"
        />
      </Link>

      <Link
        href={paths.category(_id)}
        className="text-foreground block p-4 text-center text-sm font-bold no-underline"
      >
        {name}
      </Link>
    </div>
  );
}
