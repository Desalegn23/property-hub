'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function HeroCTA() {
  const { isAuthenticated, logout } = useAuthStore();

  if (isAuthenticated) {
    return (
      <div className="flex gap-4 mt-2">
        <Link href="/dashboard" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-indigo-600 transition-transform hover:scale-105 active:scale-95">
          Go to Dashboard
        </Link>
        <button 
          onClick={() => logout()} 
          className="rounded-full border border-indigo-300 bg-indigo-500/10 px-6 py-2.5 text-sm font-semibold text-indigo-100 backdrop-blur-sm transition-transform hover:bg-indigo-500/20 hover:scale-105 active:scale-95"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 mt-2">
      <Link href="/register" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-indigo-600 transition-transform hover:scale-105 active:scale-95">
        Get Started
      </Link>
      <Link href="/login" className="rounded-full border border-indigo-300 bg-indigo-500/10 px-6 py-2.5 text-sm font-semibold text-indigo-100 backdrop-blur-sm transition-transform hover:bg-indigo-500/20 hover:scale-105 active:scale-95">
         Sign In
      </Link>
    </div>
  );
}
