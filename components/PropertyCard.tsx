'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, MapPin, BedDouble, Bath, Square } from 'lucide-react';

interface PropertyProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  isFavorite?: boolean;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  // Optimistic UI for favorite
  const [isFav, setIsFav] = useState(property.isFavorite);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFav(!isFav);
    // TODO: Call API to toggle favorite
  };

  return (
    <Link href={`/properties/${property.id}`} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={toggleFavorite}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-black/50"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={isFav ? "fill-red-500 text-red-500" : "text-gray-700 dark:text-gray-200"}
          />
        </button>
        <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-foreground backdrop-blur-md dark:bg-black/60 dark:text-white">
          ${property.price.toLocaleString()}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold text-foreground group-hover:text-primary">
            {property.title}
          </h3>
        </div>
        
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
