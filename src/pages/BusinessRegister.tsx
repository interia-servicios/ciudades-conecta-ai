import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Store, MapPin, User, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessRegister() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerRut: "",
    businessRut: "",
    businessName: "",
    businessCategory: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: ""
  });

  const businessCategories = [
    "Restaurante", "Supermercado", "Farmacia", "Ferretería", "Belleza",
    "Ropa", "Tecnología", "Hogar", "Automotriz", "Salud", "Educación",
    "Servicios Profesionales", "Entretenimiento", "Deportes", "Otro"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['ownerName', 'ownerRut', 'businessName', 'businessCategory', 'address', 'city', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Registro exitoso!",
      description: "Tu negocio ha sido registrado correctamente. Te contactaremos pronto para activar tu cuenta.",
    });
    
    console.log("Business registered:", formData);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-[var(--transition-smooth)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Registra tu Negocio</CardTitle>
            <p className="text-muted-foreground">
              Únete a AllBuy y conecta con clientes locales
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Owner Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <User className="h-5 w-5" />
                  Información del Propietario
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nombre Completo *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => updateFormData('ownerName', e.target.value)}
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ownerRut">RUT del Propietario *</Label>
                    <Input
                      id="ownerRut"
                      value={formData.ownerRut}
                      onChange={(e) => updateFormData('ownerRut', e.target.value)}
                      placeholder="12.345.678-9"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Store className="h-5 w-5" />
                  Información del Negocio
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre del Negocio *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => updateFormData('businessName', e.target.value)}
                      placeholder="Mi Tienda Local"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessRut">RUT de la Empresa</Label>
                    <Input
                      id="businessRut"
                      value={formData.businessRut}
                      onChange={(e) => updateFormData('businessRut', e.target.value)}
                      placeholder="76.123.456-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessCategory">Giro Comercial *</Label>
                  <Select value={formData.businessCategory} onValueChange={(value) => updateFormData('businessCategory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de negocio" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <MapPin className="h-5 w-5" />
                  Ubicación del Negocio
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección Completa *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                      placeholder="Av. Providencia 1234, Local 5"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        placeholder="Santiago"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="+56 9 1234 5678"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <FileText className="h-5 w-5" />
                  Información Adicional
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="contacto@mitienda.cl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del Negocio</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="Describe brevemente tu negocio y los productos o servicios que ofreces..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[var(--gradient-primary)] hover:opacity-90 transition-[var(--transition-smooth)] text-lg py-6"
              >
                Registrar Negocio
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}