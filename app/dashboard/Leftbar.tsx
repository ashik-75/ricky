"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    id: 1,
    title: "Profile",
    href: "/dashboard",
  },
  {
    id: 2,
    title: "Account",
    href: "/dashboard/account",
  },
  {
    id: 3,
    title: "Appearance",
    href: "/dashboard/appearance",
  },
  {
    id: 4,
    title: "Notification",
    href: "/dashboard/notification",
  },
  {
    id: 5,
    title: "Display",
    href: "/dashboard/display",
  },
];

function Leftbar() {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex lg:flex-col flex-row soace-x-4 lg:space-y-2">
        {links.map((link) => (
          <li
            key={link.id}
            className={` hover:underline-offset-2  px-4 py-1.5 rounded font-medium text-zinc-700 ${
              pathname == link.href ? "bg-slate-300/20" : "hover:underline"
            }`}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leftbar;
