import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { QuickReferences } from "@/components/QuickReferences";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Upload, MapPin, Sparkles } from "lucide-react";
import allbuyLogo from "@/assets/allbuy-logo.webp";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation] = useState("Santiago Centro");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would implement the actual search functionality
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={allbuyLogo} alt="AllBuy" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-foreground">AllBuy.cl</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/register")}
                className="gap-2"
              >
                <Store className="h-4 w-4" />
                Registrar Negocio
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/import")}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Importar Productos
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Encuentra todo lo que necesitas
              <span className="block text-primary">cerca de ti</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre productos y servicios locales con inteligencia artificial. 
              Conectamos tu búsqueda con los mejores negocios de tu ciudad.
            </p>
          </div>

          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              location={userLocation}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Búsquedas potenciadas por IA en {userLocation}</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Quick References */}
        <QuickReferences />

        {/* Features */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ¿Por qué elegir AllBuy?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La plataforma más completa para conectar con negocios locales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold">Búsqueda Inteligente</h4>
                <p className="text-muted-foreground">
                  Nuestra IA entiende lo que buscas y te conecta con los productos exactos que necesitas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold">100% Local</h4>
                <p className="text-muted-foreground">
                  Solo negocios registrados en tu ciudad. Apoya el comercio local y encuentra lo que está cerca
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-warning rounded-full flex items-center justify-center">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold">Fácil Gestión</h4>
                <p className="text-muted-foreground">
                  Los negocios pueden registrarse fácilmente y gestionar sus productos con herramientas de IA
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 AllBuy.cl - Conectando negocios locales con inteligencia artificial</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
