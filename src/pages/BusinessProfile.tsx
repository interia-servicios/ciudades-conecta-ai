import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, MapPin, Clock, Phone, Share2, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const mockBusiness = {
  id: 1,
  name: "Supermercado Central",
  category: "Supermercado",
  rating: 4.5,
  reviews: 128,
  location: "Av. Providencia 1234, Providencia",
  phone: "+56 9 1234 5678",
  hours: "Lun-Dom: 8:00 - 22:00",
  description: "Tu supermercado de confianza con productos frescos y precios competitivos. Más de 20 años sirviendo a la comunidad.",
  image: "/api/placeholder/400/300",
  isOpen: true,
  followers: 1240
};

const mockProducts = [
  {
    id: 1,
    name: "Pan Integral Artesanal",
    price: 2890,
    image: "/api/placeholder/200/200",
    rating: 4.8,
    stock: 15,
    description: "Pan integral recién horneado, ingredientes naturales"
  },
  {
    id: 2,
    name: "Leche Entera 1L",
    price: 990,
    image: "/api/placeholder/200/200",
    rating: 4.6,
    stock: 50,
    description: "Leche fresca de vaca, pasteurizada"
  },
  {
    id: 3,
    name: "Manzanas Rojas kg",
    price: 1890,
    image: "/api/placeholder/200/200",
    rating: 4.7,
    stock: 25,
    description: "Manzanas rojas frescas, directas del huerto"
  },
  {
    id: 4,
    name: "Yogurt Natural 150g",
    price: 450,
    image: "/api/placeholder/200/200",
    rating: 4.5,
    stock: 30,
    description: "Yogurt cremoso sin aditivos artificiales"
  },
  {
    id: 5,
    name: "Aceite de Oliva 500ml",
    price: 3490,
    image: "/api/placeholder/200/200",
    rating: 4.9,
    stock: 12,
    description: "Aceite de oliva extra virgen, importado"
  },
  {
    id: 6,
    name: "Café Premium 250g",
    price: 4990,
    image: "/api/placeholder/200/200",
    rating: 4.8,
    stock: 8,
    description: "Café de grano selecto, tueste medio"
  }
];

const mockReviews = [
  {
    id: 1,
    author: "María González",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    date: "2024-01-15",
    comment: "Excelente atención y productos frescos. Siempre encuentro lo que busco."
  },
  {
    id: 2,
    author: "Carlos Mendoza",
    avatar: "/api/placeholder/40/40",
    rating: 4,
    date: "2024-01-10",
    comment: "Buenos precios y ubicación conveniente. La verdura está siempre fresca."
  },
  {
    id: 3,
    author: "Ana Silva",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    date: "2024-01-08",
    comment: "Personal muy amable y el local siempre está limpio y ordenado."
  }
];

export default function BusinessProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] cursor-pointer">
      <div 
        className="aspect-square relative"
        onClick={() => setSelectedProduct(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock < 10 && (
          <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
            ¡Últimas unidades!
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-success">${product.price.toLocaleString()}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <Button size="sm" className="w-full gap-1">
          <ShoppingCart className="h-3 w-3" />
          Agregar
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-[var(--transition-smooth)] mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a búsqueda
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={mockBusiness.image}
                alt={mockBusiness.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{mockBusiness.name}</h1>
                  <p className="text-muted-foreground">{mockBusiness.category}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{mockBusiness.rating}</span>
                  <span className="text-muted-foreground">({mockBusiness.reviews} reseñas)</span>
                </div>
                
                <Badge variant={mockBusiness.isOpen ? "default" : "secondary"}>
                  <Clock className="h-3 w-3 mr-1" />
                  {mockBusiness.isOpen ? "Abierto" : "Cerrado"}
                </Badge>
                
                <span className="text-muted-foreground">{mockBusiness.followers} seguidores</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{mockBusiness.location}</span>
              </div>
              
              <p className="text-sm">{mockBusiness.description}</p>
              
              <div className="flex gap-3">
                <Button className="gap-2">
                  <Phone className="h-4 w-4" />
                  Llamar
                </Button>
                <Button variant="outline">
                  Seguir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Horarios de Atención</h3>
                  <p className="text-muted-foreground">{mockBusiness.hours}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Teléfono</h3>
                  <p className="text-muted-foreground">{mockBusiness.phone}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Dirección</h3>
                  <p className="text-muted-foreground">{mockBusiness.location}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Sobre nosotros</h3>
                  <p className="text-muted-foreground">{mockBusiness.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "fill-warning text-warning"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}