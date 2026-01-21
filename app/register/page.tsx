'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Building2, Loader2, AlertCircle, User, Briefcase } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'REGULAR_USER' as 'REGULAR_USER' | 'PROPERTY_OWNER',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Real API call
      await api.post('/auth/register', formData);
      
      // Auto login after register (optional, but good UX)
      // For now, let's redirect to login for simplicity and security, or call login endpoint immediately.
      // Let's call login immediately
      const loginRes = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { access_token, user } = loginRes.data;

      login(access_token, {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
            <Building2 size={28} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join PropertyHub to find or list your properties
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          
          <div className="space-y-4">
             <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
               <button
                 type="button"
                 onClick={() => setFormData({...formData, role: 'REGULAR_USER'})}
                 className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all ${formData.role === 'REGULAR_USER' ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary' : 'border-border hover:bg-secondary'}`}
               >
                  <User size={24} />
                  <span className="text-sm font-medium">Regular User</span>
               </button>
               <button
                 type="button"
                 onClick={() => setFormData({...formData, role: 'PROPERTY_OWNER'})}
                 className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all ${formData.role === 'PROPERTY_OWNER' ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary' : 'border-border hover:bg-secondary'}`}
               >
                  <Briefcase size={24} />
                  <span className="text-sm font-medium">Property Owner</span>
               </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center justify-items-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/90">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
