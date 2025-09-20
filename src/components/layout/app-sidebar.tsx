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
  Target,
  ListOrdered,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { usePathname } from 'next/navigation';
import { ThemeToggle } from "@/components/theme-toggle";

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14 8V6H9.5C8.12 6 7 7.12 7 8.5C7 9.88 8.12 11 9.5 11H12V13H8"/>
      <path d="M9 16C9.82843 16 10.5 15.3284 10.5 14.5C10.5 13.6716 9.82843 13 9 13C8.17157 13 7.5 13.6716 7.5 14.5C7.5 15.3284 8.17157 16 9 16Z" fill="currentColor"/>
      <path d="M15 16C15.8284 16 16.5 15.3284 16.5 14.5C16.5 13.6716 15.8284 13 15 13C14.1716 13 13.5 13.6716 13.5 14.5C13.5 15.3284 14.1716 16 15 16Z" fill="currentColor"/>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 8H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 8H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

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
            <Logo className="size-5" />
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
