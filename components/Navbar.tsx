'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Menu, X, Home, Building2, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-slate-900/80">
      <div className="container-main flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Building2 size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">PropertyHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/properties" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Properties
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-muted-foreground">Hi, {user?.name || 'User'}</span>
                 <button onClick={() => logout()} className="btn btn-outline h-9 px-4 text-xs">
                    Sign Out
                 </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="btn btn-outline h-9">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary h-9 shadow-lg shadow-indigo-500/20">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-main space-y-1 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/properties"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Properties
            </Link>
            {isAuthenticated ? (
              <>
                 <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                   <button onClick={() => { logout(); setIsOpen(false); }} className="w-full btn btn-outline">
                      Sign Out
                   </button>
                </div>
              </>
            ) : (
              <div className="mt-4 flex flex-col gap-2 px-3">
                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full btn btn-outline justify-center">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full btn btn-primary justify-center shadow-lg">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
