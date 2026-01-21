import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, BedDouble, Bath, Square, Calendar, User, Phone, Mail } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock Fetch Single Property
async function getProperty(id: string) {
  // Mock Data (same as listings basically)
  const allProperties = [
    {
      id: '1',
      title: 'Modern Luxury Villa',
      description: 'Experience the epitome of luxury living in this stunning modern villa. Featuring floor-to-ceiling windows, an infinity pool, and breathtaking views of the city. Defines elegance and sophistication.',
      price: 1250000,
      location: 'Beverly Hills, CA',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200',
      beds: 5,
      baths: 4,
      sqft: 4200,
      publishedAt: '2025-01-10',
      owner: { name: 'Sarah Connor', email: 'sarah@example.com', phone: '+1 (555) 123-4567' }
    },
    // Add more if needed matching IDs
  ];

  const property = allProperties.find(p => p.id === id);
  
  // Return mock default if not found in list but id is valid-ish, or null
  if (!property && id === '1') return allProperties[0];
  if (!property) {
     // Fallback for demo purposes for other IDs
     return {
        ...allProperties[0],
         id: id,
         title: `Property ${id}`,
         location: 'Demo Location',
         price: 500000 * parseInt(id) || 1000000
     }
  }
  
  return property;
}

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  return (
    <main className="container-main py-8">
      {/* Back Button */}
      <Link href="/properties" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} /> Back to Properties
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
           {/* Image Gallery (Single Hero for now) */}
           <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
             <Image
               src={property.image}
               alt={property.title}
               fill
               className="object-cover"
               priority
             />
             <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-foreground backdrop-blur-md">
                ${property.price.toLocaleString()}
             </div>
           </div>
           
           {/* Details */}
           <div>
             <div className="mb-4">
               <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{property.title}</h1>
               <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                 <MapPin size={18} />
                 <span>{property.location}</span>
               </div>
             </div>
             
             <div className="flex flex-wrap gap-6 rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2">
                   <BedDouble className="text-primary" size={24} />
                   <div>
                     <p className="text-sm font-medium text-muted-foreground">Bedrooms</p>
                     <p className="text-lg font-bold">{property.beds}</p>
                   </div>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block"></div>
                <div className="flex items-center gap-2">
                   <Bath className="text-primary" size={24} />
                   <div>
                     <p className="text-sm font-medium text-muted-foreground">Bathrooms</p>
                     <p className="text-lg font-bold">{property.baths}</p>
                   </div>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block"></div>
                 <div className="flex items-center gap-2">
                   <Square className="text-primary" size={24} />
                   <div>
                     <p className="text-sm font-medium text-muted-foreground">Square Feet</p>
                     <p className="text-lg font-bold">{property.sqft}</p>
                   </div>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block"></div>
                 <div className="flex items-center gap-2">
                   <Calendar className="text-primary" size={24} />
                   <div>
                     <p className="text-sm font-medium text-muted-foreground">Listed</p>
                     <p className="text-lg font-bold">{property.publishedAt}</p>
                   </div>
                </div>
             </div>

             <div className="mt-8">
               <h2 className="mb-4 text-xl font-bold">Description</h2>
               <p className="text-lg leading-relaxed text-muted-foreground">
                 {property.description}
               </p>
             </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           {/* Contact Card */}
           <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold">Contact Agent</h3>
              
              <div className="mb-6 flex items-center gap-4">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User size={24} />
                 </div>
                 <div>
                    <p className="font-bold">{property.owner.name}</p>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition-all hover:bg-primary/90">
                    <Phone size={18} /> Call Agent
                 </button>
                 <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-transparent py-3 font-semibold text-primary transition-all hover:bg-primary/5">
                    <Mail size={18} /> Send Message
                 </button>
              </div>
           </div>
           
           {/* Safety Tips or Map Placeholder */}
           <div className="rounded-xl bg-blue-50 p-6 dark:bg-blue-950/20">
              <h4 className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
                 <div className="h-2 w-2 rounded-full bg-blue-500"></div> Safety Tip
              </h4>
              <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                 Never transfer money before viewing the property in person.
              </p>
           </div>
        </div>
      </div>
    </main>
  );
}
