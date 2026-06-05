'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome,        // House
  FiSearch,      // Magnifier
  FiBell,        // Bell
  FiMail,        // Envelope
  FiUser,        // Person
  FiSettings,    // Gear
  FiMenu         // Mobile Panel Toggle
} from "react-icons/fi";
import { Button, Drawer } from "@heroui/react";

export function DasboardSidebar() {
  const pathname = usePathname();

  // Navigation array structured EXACTLY like your code editor screenshot
  const navItems = [
    { icon: FiHome, href: "/dashboard/recruiter", label: "Home" },
    { icon: FiSearch, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: FiBell, href: "/dashboard/recruiter/jobs/new", label: "Create A Job" },
    { icon: FiMail, href: "/messages", label: "Messages" },
    { icon: FiUser, href: "/dashboard/recruiter/company", label: "Profile" },
    { icon: FiSettings, href: "/settings", label: "Settings" },
  ];

  // Universal Navigation Content block
  const navContent = (
    <nav className="flex flex-col gap-1 w-full">
      {navItems.map((item) => {
        // Active if exact match OR if it's the home dashboard root base route
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group relative flex items-center gap-3.5 px-4 py-3.5 text-sm font-medium rounded-md transition-all duration-200 outline-none ${
              isActive
                ? 'bg-zinc-800/65 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
            }`}
          >
            {/* Active Vertical White Accent Line from image_d80c80.png */}
            {isActive && (
              <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-white rounded-l-md" />
            )}

            {/* Icon Element Vector */}
            <item.icon 
              className={`size-5 transition-colors ${
                isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'
              }`} 
            />

            {/* Label String */}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="bg-[#020105]">
      {/* Desktop Layout Sidebar Component (Matching image_d80c80.png visuals) */}
      <aside className="hidden lg:block w-64 min-h-screen shrink-0 border-zinc-900 border-r p-4 bg-[#0a090e]/30 backdrop-blur-md">
        <div className="mb-6 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 block">Recruiter Panel</span>
        </div>
        {navContent}
      </aside>

      {/* Mobile Drawer Navigation System */}
      <div className="lg:hidden p-4 border-b border-zinc-900 bg-[#020105] flex items-center justify-between">
        <Drawer>
          <Button className="bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-lg text-xs font-medium" variant="secondary">
            <FiMenu className="size-4 mr-1" />
            Menu Panel
          </Button>
          <Drawer.Backdrop className="backdrop-blur-sm bg-black/40">
            <Drawer.Content placement="left" className="bg-[#0a090e] border-r border-zinc-800 text-zinc-100 max-w-[280px]">
              <Drawer.Dialog className="bg-[#0a090e]">
                <Drawer.CloseTrigger className="text-zinc-500 hover:text-white" />
                <Drawer.Header className="border-b border-zinc-900 pb-4">
                  <Drawer.Heading className="text-sm font-bold uppercase tracking-wider text-zinc-400">Navigation Hub</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body className="pt-4 px-2">
                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </div>
  );
}