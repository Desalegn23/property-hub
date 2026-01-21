import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import HeroCTA from '@/components/HeroCTA';
import { Search, ArrowRight } from 'lucide-react';

// Mock data for featured properties
const FEATURED_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 1250000,
    location: 'Beverly Hills, CA',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop', // Placeholder
    beds: 5,
    baths: 4,
    sqft: 4200,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 850000,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop', // Placeholder
    beds: 3,
    baths: 2,
    sqft: 1800,
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Seaside Retreat',
    price: 2100000,
    location: 'Malibu, CA',
    image: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=1200&auto=format&fit=crop', // Placeholder
    beds: 4,
    baths: 3.5,
    sqft: 3500,
    isFavorite: false,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative flex h-[500px] flex-col items-center justify-center overflow-hidden bg-slate-900 text-center text-white md:h-[600px]">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="container-main relative z-10 flex flex-col items-center gap-6">
          <div className="rounded-full bg-indigo-500/20 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm">
            #1 Property Listing Platform
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-balance">
            Find Your Dream Home With <span className="text-indigo-400">PropertyHub</span>
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Browse thousands of luxury apartments, modern homes, and cozy cottages. Your next chapter starts here.
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex w-full max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-2xl shadow-indigo-500/20 focus-within:ring-4 focus-within:ring-indigo-500/30">
            <div className="pl-4 text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by location, property type..."
              className="flex-1 border-none bg-transparent px-2 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
            />
            <button className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700">
              Search
            </button>
          </div>

          {/* Hero CTAs */}
          <HeroCTA />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container-main">
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Properties</h2>
              <p className="text-muted-foreground">Hand-picked selection of the most premium listings.</p>
            </div>
            <Link href="/properties" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:flex">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {FEATURED_PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
             ))}
          </div>

          <Link href="/properties" className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-3 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-main">
        <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-12 text-center text-white shadow-xl shadow-indigo-600/20 md:px-12 md:py-20 lg:text-left">
           <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
             <div className="flex flex-col gap-4">
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to list your property?</h2>
               <p className="max-w-lg text-lg text-indigo-100">
                 Join thousands of property owners and start reaching millions of potential buyers today.
               </p>
             </div>
             <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/register" className="btn bg-white text-indigo-600 hover:bg-indigo-50">
                  Become an Owner
                </Link>
                <Link href="/contact" className="btn border-indigo-400 bg-indigo-700 text-white hover:bg-indigo-800">
                  Contact Support
                </Link>
             </div>
           </div>
           
           {/* Decorative circles */}
           <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
           <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl" />
        </div>
      </section>
    </main>
  );
}
