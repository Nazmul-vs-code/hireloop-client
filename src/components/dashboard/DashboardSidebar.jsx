'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiSearch, FiBell, FiMail, FiUser, FiSettings, FiMenu, 
  FiLayout, FiBookmark, FiFileText, FiCreditCard,
  FiUsers, FiBriefcase, FiDollarSign // Added Admin icons
} from "react-icons/fi";
import { Button, Drawer } from "@heroui/react";

export function DasboardSidebar({ role }) {
  const pathname = usePathname();
  
  // Logic to determine navigation based on role
  const getNavItems = () => {
    if (role === 'admin') {
      return [
        { icon: FiLayout, href: "/dashboard/admin", label: "Dashboard" },
        { icon: FiUsers, href: "/dashboard/admin/users", label: "Users" },
        { icon: FiBriefcase, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: FiSearch, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: FiDollarSign, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: FiSettings, href: "/dashboard/admin/settings", label: "Settings" },
      ];
    }
    
    if (role === 'recruiter') {
      return [
        { icon: FiHome, href: "/dashboard/recruiter", label: "Home" },
        { icon: FiSearch, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: FiBell, href: "/dashboard/recruiter/jobs/new", label: "Create A Job" },
        { icon: FiMail, href: "/messages", label: "Messages" },
        { icon: FiUser, href: "/dashboard/recruiter/company", label: "Profile" },
        { icon: FiSettings, href: "/settings", label: "Settings" },
      ];
    }

    // Default to seeker
    return [
      { icon: FiLayout, href: "/dashboard/seeker", label: "Dashboard" },
      { icon: FiSearch, href: "/dashboard/seeker/jobs", label: "Jobs" },
      { icon: FiBookmark, href: "/dashboard/seeker/saved", label: "Saved Jobs" },
      { icon: FiFileText, href: "/dashboard/seeker/applications", label: "Applications" },
      { icon: FiCreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
      { icon: FiSettings, href: "/dashboard/seeker/settings", label: "Settings" },
    ];
  };

  const navItems = getNavItems();

  const navContent = (
    <nav className="flex flex-col gap-1 w-full">
      {navItems.map((item) => {
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
            {isActive && (
              <span className="absolute right-0 top-0 bottom-0 w-0.75 bg-white rounded-l-md" />
            )}
            <item.icon 
              className={`size-5 transition-colors ${
                isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'
              }`} 
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 min-h-screen shrink-0 border-zinc-900 border-r p-4 bg-[#0a090e]/30 backdrop-blur-md">
        <div className="mb-6 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 block">
            {role === 'admin' ? 'Admin Panel' : role === 'recruiter' ? 'Recruiter Panel' : 'Candidate Panel'}
          </span>
        </div>
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden m-4 inline-flex items-center gap-2" variant="secondary">
          <FiMenu className="size-5" />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="w-[min(80vw,320px)] bg-[#0a090e]/95 backdrop-blur-md">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="p-4">
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}