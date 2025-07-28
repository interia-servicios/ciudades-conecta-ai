import { BusinessCard } from "./BusinessCard";

const popularBusinesses = [
  {
    id: 1,
    name: "Supermercado Central",
    category: "Supermercado",
    rating: 4.5,
    reviews: 128,
    location: "Av. Providencia 1234, Providencia",
    image: "/api/placeholder/300/200",
    distance: "0.8 km",
    isOpen: true,
    phone: "+56 9 1234 5678"
  },
  {
    id: 2,
    name: "Farmacia del Pueblo",
    category: "Farmacia",
    rating: 4.7,
    reviews: 89,
    location: "Calle Principal 567, Centro",
    image: "/api/placeholder/300/200",
    distance: "1.2 km",
    isOpen: true,
    phone: "+56 9 8765 4321"
  },
  {
    id: 3,
    name: "Restaurante La Casa",
    category: "Restaurante",
    rating: 4.3,
    reviews: 156,
    location: "Paseo Ahumada 890, Santiago Centro",
    image: "/api/placeholder/300/200",
    distance: "0.5 km",
    isOpen: false,
    phone: "+56 9 5555 0000"
  },
  {
    id: 4,
    name: "Ferretería El Martillo",
    category: "Ferretería",
    rating: 4.6,
    reviews: 73,
    location: "Av. Independencia 345, Independencia",
    image: "/api/placeholder/300/200",
    distance: "2.1 km",
    isOpen: true,
    phone: "+56 9 7777 1111"
  },
  {
    id: 5,
    name: "Peluquería Estilo",
    category: "Belleza",
    rating: 4.8,
    reviews: 94,
    location: "Calle Estado 678, Centro",
    image: "/api/placeholder/300/200",
    distance: "1.5 km",
    isOpen: true,
    phone: "+56 9 3333 2222"
  },
  {
    id: 6,
    name: "Librería del Saber",
    category: "Librería",
    rating: 4.4,
    reviews: 67,
    location: "Av. Bernardo O'Higgins 234, Santiago",
    image: "/api/placeholder/300/200",
    distance: "1.8 km",
    isOpen: true,
    phone: "+56 9 4444 5555"
  }
];

export const QuickReferences = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Negocios populares cerca de ti
        </h2>
        <p className="text-muted-foreground">
          Descubre los servicios mejor valorados en tu área
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularBusinesses.map((business) => (
          <BusinessCard
            key={business.id}
            name={business.name}
            category={business.category}
            rating={business.rating}
            reviews={business.reviews}
            location={business.location}
            image={business.image}
            distance={business.distance}
            isOpen={business.isOpen}
            phone={business.phone}
            onClick={() => console.log(`Clicked on ${business.name}`)}
          />
        ))}
      </div>
    </div>
  );
};