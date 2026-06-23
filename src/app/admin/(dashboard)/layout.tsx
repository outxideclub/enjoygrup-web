"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UtensilsCrossed, Image as ImageIcon, Building2, Scale, Phone, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Carta", icon: UtensilsCrossed },
  { href: "/admin/galeria", label: "Galería", icon: ImageIcon },
  { href: "/admin/info", label: "Locales", icon: Building2 },
  { href: "/admin/contacto", label: "Contacto", icon: Phone },
  { href: "/admin/legal", label: "Legal", icon: Scale },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebar = (
    <nav className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-zinc-800">
        <h2 className="text-lg font-bold text-white">Grupo Enjoy</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Panel de administración</p>
      </div>

      <div className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sky-600/10 text-sky-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-2 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 bg-zinc-900 border-r border-zinc-800">
        {sidebar}
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-white">Grupo Enjoy Admin</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-zinc-400 hover:text-white"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-56 bg-zinc-900 border-r border-zinc-800">
            {sidebar}
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-56">
        <div className="pt-16 md:pt-0 p-6 md:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
