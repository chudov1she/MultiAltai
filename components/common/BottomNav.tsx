"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Radio, Phone } from "lucide-react";

const navItems = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/catalog", label: "Каталог", icon: Map },
  { href: "/channel", label: "Канал", icon: Radio },
  { href: "/contacts", label: "Контакты", icon: Phone },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden h-16 bg-white border-t border-gray-200">
      <div className="grid h-full grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? "text-[#00B4D8] font-semibold" : "text-gray-600 hover:text-[#00B4D8]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

