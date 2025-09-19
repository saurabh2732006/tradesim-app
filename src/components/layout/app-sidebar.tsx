"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Wallet,
  Newspaper,
  Github,
  AreaChart,
  Target,
  ListOrdered,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { usePathname } from 'next/navigation';
import { ThemeToggle } from "@/components/theme-toggle";

export function AppSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/watchlist", icon: Target, label: "Watchlist" },
    { href: "/positions", icon: Wallet, label: "Positions" },
    { href: "/orders", icon: ListOrdered, label: "Orders" },
    { href: "/account", icon: User, label: "Account" },
    { href: "/news", icon: Newspaper, label: "News" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <AreaChart className="size-5" />
          </div>
          <h1 className="font-headline text-lg font-semibold">TradeSim</h1>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton href={item.href} isActive={pathname === item.href}>
              <item.icon />
              {item.label}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <div className="flex items-center justify-between p-2">
          <ThemeToggle />
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="https://github.com/firebase/studio-templates" target="_blank">
                <Github />
                GitHub
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} >
                <LogOut />
                Logout
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
