'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Initial values from URL
  const [priceRange, setPriceRange] = useState(searchParams.get('maxPrice') || '10000000');
  const [location, setLocation] = useState(searchParams.get('location') || '');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (priceRange) params.set('maxPrice', priceRange);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by location (e.g. New York)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Filter Toggle Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 font-medium md:hidden"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>

        {/* Desktop Filter Button (Search) */}
        <button
          onClick={handleSearch}
          className="hidden rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:block"
        >
          Search
        </button>
      </div>

      {/* Expanded Filters (Mobile & Desktop commonly shown or toggleable) */}
      <div className={`grid gap-6 rounded-lg border border-border bg-card p-6 transition-all ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Price Range */}
          <div className="space-y-3">
             <label className="text-sm font-medium">Max Price: ${parseInt(priceRange).toLocaleString()}</label>
             <input
               type="range"
               min="0"
               max="5000000"
               step="50000"
               value={priceRange}
               onChange={(e) => setPriceRange(e.target.value)}
               className="h-2 w-full cursor-pointer rounded-lg bg-secondary appearance-none accent-primary"
             />
             <div className="flex justify-between text-xs text-muted-foreground">
               <span>$0</span>
               <span>$5M+</span>
             </div>
          </div>

          {/* Property Type (Mock) */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Property Type</label>
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
          </div>

           {/* Bedrooms (Mock) */}
           <div className="space-y-3">
            <label className="text-sm font-medium">Bedrooms</label>
            <div className="flex gap-2">
               {[1, 2, 3, 4, '5+'].map((num) => (
                  <button key={num} className="h-9 min-w-[36px] items-center justify-center rounded-md border border-border hover:bg-secondary focus:bg-primary focus:text-white">
                    {num}
                  </button>
               ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Search Action */}
        <button onClick={handleSearch} className="mt-4 w-full rounded-lg bg-primary py-3 font-semibold text-white md:hidden">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
