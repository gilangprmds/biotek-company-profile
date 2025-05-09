"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.replace(/-/g, " "); // Format nama

    return (
      <li key={href} className="flex items-center space-x-1">
        <span className="text-gray-400">›</span>
        <Link href={href} className="text-blue-600 hover:underline capitalize">
          {decodeURIComponent(label)}
        </Link>
      </li>
    );
  });

  if (pathname === "/") return null; // Tidak tampil di halaman home

  return (
    <nav className="bg-gray-100 py-2 px-4 text-sm rounded mb-4">
      <ul className="flex items-center space-x-1">
        <li>
          <Link href="/" className="flex items-center text-blue-600 hover:underline">
            <FaHome className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        {crumbs}
      </ul>
    </nav>
  );
}
