'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiSearch, FiBell, FiMail, FiUser, FiSettings, FiMenu, 
  FiLayout, FiBookmark, FiFileText, FiCreditCard 
} from "react-icons/fi";
import { Button, Drawer } from "@heroui/react";

export function DasboardSidebar({ role }) {
  const pathname = usePathname();
  
  // Directly choose the array based on the prop, no state needed
  const navItems = role === 'recruiter' ? [
    { icon: FiHome, href: "/dashboard/recruiter", label: "Home" },
    { icon: FiSearch, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: FiBell, href: "/dashboard/recruiter/jobs/new", label: "Create A Job" },
    { icon: FiMail, href: "/messages", label: "Messages" },
    { icon: FiUser, href: "/dashboard/recruiter/company", label: "Profile" },
    { icon: FiSettings, href: "/settings", label: "Settings" },
  ] : [
    { icon: FiLayout, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: FiSearch, href: "/dashboard/seeker/jobs", label: "Jobs" },
    { icon: FiBookmark, href: "/dashboard/seeker/saved", label: "Saved Jobs" },
    { icon: FiFileText, href: "/dashboard/seeker/applications", label: "Applications" },
    { icon: FiCreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: FiSettings, href: "/dashboard/seeker/settings", label: "Settings" },
  ];

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
              <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-white rounded-l-md" />
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
    <div className="bg-[#020105]">
      <aside className="hidden lg:block w-64 min-h-screen shrink-0 border-zinc-900 border-r p-4 bg-[#0a090e]/30 backdrop-blur-md">
        <div className="mb-6 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 block">
            {role === 'recruiter' ? 'Recruiter Panel' : 'Candidate Panel'}
          </span>
        </div>
        {navContent}
      </aside>

      {/* Mobile Drawer remains the same... */}
      {/* ... */}
    </div>
  );
}