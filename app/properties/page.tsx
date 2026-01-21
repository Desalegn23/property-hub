import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import api from '@/lib/api';
import { AlertCircle } from 'lucide-react';

// Force dynamic rendering since we are reading searchParams
export const dynamic = 'force-dynamic';

interface PropertiesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getProperties(searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    const params = new URLSearchParams();
    if (searchParams.location) params.append('search', searchParams.location as string);
    if (searchParams.price) {
        // Assuming price format "0-500000"
        const [min, max] = (searchParams.price as string).split('-');
        if (min) params.append('minPrice', min);
        if (max && max !== 'plus') params.append('maxPrice', max);
    }
    
    const res = await api.get('/properties', { params });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch properties', error);
    return [];
  }
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const properties = await getProperties(searchParams);

  return (
    <main className="min-h-screen bg-muted/30 pb-20 pt-24">
      <div className="container-main">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Find Your Dream Property</h1>
          <p className="text-muted-foreground">Browse our exclusive list of premium properties.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <PropertyFilters />
          </div>

          <div className="lg:col-span-3">
             {properties.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property: any) => (
                    <PropertyCard 
                        key={property.id} 
                        property={{
                            id: property.id,
                            title: property.title,
                            price: property.price,
                            location: property.location,
                            // Fallback image if none provided or array empty
                            image: property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=800',
                            beds: 3, // Backend doesn't have beds/baths yet, mocking
                            baths: 2,
                            sqft: 2000,
                            isFavorite: false
                        }} 
                    />
                  ))}
                </div>
             ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                   <div className="mb-4 rounded-full bg-muted p-4">
                      <AlertCircle className="h-8 w-8 text-muted-foreground" />
                   </div>
                   <h3 className="text-lg font-semibold">No properties found</h3>
                   <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}
