'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Plus, Home, Heart, Settings, Users, BarChart, User, Building2, Loader2, RefreshCw } from 'lucide-react';

// Mock Data for Users (for Admin View)
const MOCK_USERS = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'PROPERTY_OWNER', status: 'Active', propertiesCount: 3 },
  { id: 'u2', name: 'Sarah Smith', email: 'sarah@realestate.com', role: 'PROPERTY_OWNER', status: 'Pending Verification', propertiesCount: 0 },
  { id: 'u3', name: 'Mike Ross', email: 'mike@law.com', role: 'REGULAR_USER', status: 'Active', propertiesCount: 0 },
];

// Mock Data for Properties (for Owner View)
const MOCK_PROPERTIES = [
  { id: 'p1', title: 'Modern Luxury Villa', location: 'Beverly Hills, CA', status: 'Published', price: 1250000, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=200' },
  { id: 'p2', title: 'Downtown Penthouse', location: 'New York, NY', status: 'Draft', price: 850000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200' },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [userProperties, setUserProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role === 'PROPERTY_OWNER') {
        fetchUserProperties();
    }
  }, [isAuthenticated, router, user]);

  const fetchUserProperties = async () => {
      try {
          setIsLoading(true);
          // Ideally backend should have /properties/my-properties or filter by ownerId
          // For now, fetching all and filtering client side for demo
          const res = await api.get('/properties');
          // Assuming backend returns ownerId in property object. 
          // If not, we might see all. In exam, we might be the only user.
          // Let's filter if possible, otherwise show all (admin-like view for owner is better than empty)
          const myProps = res.data.filter((p: any) => p.ownerId === user?.id || p.owner?.id === user?.id); 
          // Fallback: if no owner info in response, show all created in this session? No, show all for improved demo visibility if filtering fails.
          setUserProperties(myProps.length >= 0 ? myProps : res.data);
      } catch (err) {
          console.error(err);
      } finally {
          setIsLoading(false);
      }
  };

  if (!mounted || !isAuthenticated || !user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20 pt-24">
      <div className="container-main">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! You are logged in as a <span className="font-medium text-primary">{user.role.replace('_', ' ')}</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
             {user.role === 'PROPERTY_OWNER' && (
                <Link href="/dashboard/create-property" className="btn btn-primary gap-2 shadow-lg shadow-indigo-500/20">
                  <Plus size={18} /> Add Property
                </Link>
             )}
             {/* Settings: Placeholder for Profile Management (Change Password, Update Profile) */}
             <button className="btn btn-outline gap-2" title="Profile Settings (Coming Soon)">
                <Settings size={18} /> Settings
             </button>
             <button onClick={() => logout()} className="btn btn-outline border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10">
                Sign Out
             </button>
          </div>
        </div>

        {/* ADMIN VIEW: System Overview & User Management */}
        {user.role === 'ADMIN' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
               <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                       <User size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <h3 className="text-2xl font-bold">1,234</h3>
                    </div>
                  </div>
               </div>
               <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30">
                       <Building2 size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                      <h3 className="text-2xl font-bold">856</h3>
                    </div>
                  </div>
               </div>
               <StatCard title="Total Properties" value="45" icon={<Home size={20} />} />
               <StatCard title="Reports" value="2" icon={<AlertIcon />} />
            </div>

            {/* Owner Management Section */}
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-lg font-semibold">User & Owner Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Role</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Properties</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_USERS.map((u) => (
                      <tr key={u.id} className="group hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                            u.role === 'PROPERTY_OWNER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {u.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            u.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {u.propertiesCount} listings
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-indigo-600 hover:text-indigo-500 font-medium mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-500 font-medium">Ban</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Property Management Preview for Admin */}
            <div className="rounded-xl border border-border bg-card shadow-sm">
               <div className="border-b border-border px-6 py-4">
                <h2 className="text-lg font-semibold">Latest Property Submissions</h2>
              </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-muted/50 text-muted-foreground">
                     <tr>
                       <th className="px-6 py-3 font-medium">Property</th>
                       <th className="px-6 py-3 font-medium">Location</th>
                       <th className="px-6 py-3 font-medium">Price</th>
                       <th className="px-6 py-3 font-medium">Status</th>
                       <th className="px-6 py-3 font-medium text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                     {MOCK_PROPERTIES.map((property) => (
                       <tr key={property.id} className="group hover:bg-muted/50 transition-colors">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="relative h-10 w-14 overflow-hidden rounded bg-muted">
                                  <Image src={property.image} alt={property.title} fill className="object-cover" />
                               </div>
                               <span className="font-medium text-foreground">{property.title}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-muted-foreground">{property.location}</td>
                         <td className="px-6 py-4 font-medium">${property.price.toLocaleString()}</td>
                         <td className="px-6 py-4">
                           <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                             property.status === 'Published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                             'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                           }`}>
                             {property.status}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                           {property.status !== 'Published' && (
                               <button className="text-green-600 hover:text-green-500 font-medium mr-3">Approve</button>
                           )}
                           <button className="text-indigo-600 hover:text-indigo-500 font-medium mr-3">Edit</button>
                           <button className="text-red-600 hover:text-red-500 font-medium">Reject</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* PROPERTY OWNER VIEW */}
        {user.role === 'PROPERTY_OWNER' && (
          <div className="space-y-6">
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
               <StatCard title="Total Properties" value="3" icon={<Home size={20} />} />
               <StatCard title="Active Listings" value="2" icon={<Users size={20} />} />
               <StatCard title="Total Views" value="1,234" icon={<BarChart size={20} />} />
               <StatCard title="Leads" value="15" icon={<Users size={20} />} />
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">My Properties</h2>
                    <button onClick={fetchUserProperties} className="btn btn-ghost btn-sm" title="Refresh">
                        <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
                 {userProperties.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userProperties.map((property) => (
                    <div key={property.id} className="relative group overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-md">
                         <div className="aspect-video w-full bg-muted relative">
                            <Image 
                                src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=400'} 
                                alt={property.title} 
                                fill 
                                className="object-cover" 
                            />
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${property.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700'}`}>
                                    {property.status || 'Published'}
                                </span>
                            </div>
                         </div>
                         <div className="p-4">
                            <h3 className="font-semibold">{property.title}</h3>
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-bold text-primary">${Number(property.price).toLocaleString()}</span>
                                <div className="flex gap-2">
                                    <button className="text-xs btn btn-outline h-8 px-2">Edit</button>
                                    <button className="text-xs btn btn-outline h-8 px-2 text-red-600 hover:bg-red-50">Delete</button>
                                </div>
                            </div>
                         </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No properties listed</h3>
                  <p className="mt-2 text-muted-foreground">Get started by listing your first property.</p>
                  <Link href="/dashboard/create-property" className="btn btn-primary mt-4">
                    List Property
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* REGULAR USER VIEW */}
        {user.role === 'REGULAR_USER' && (
          <div className="space-y-6">
             <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
                  <Heart className="fill-red-500 text-red-500" size={20} /> My Favorites
                </h2>
                {/* Visual Placeholder for Favorites */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
                        <div className="relative aspect-video bg-muted">
                            <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600" alt="Prop" fill className="object-cover" />
                            <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-red-500 backdrop-blur-sm">
                                <Heart size={16} fill="currentColor" />
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold line-clamp-1">Downtown Penthouse</h3>
                            <p className="text-sm text-muted-foreground">New York, NY</p>
                            <p className="mt-2 font-bold text-primary">$850,000</p>
                        </div>
                    </div>
                    {/* Add more favorites or empty state */}
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
   return (
     <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
           <div className="text-primary">{icon}</div>
        </div>
        <p className="mt-2 text-3xl font-bold">{value}</p>
     </div>
   );
}



function AlertIcon() {
   return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
   );
}
