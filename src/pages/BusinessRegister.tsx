import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Store, MapPin, User, FileText, Upload, Download, Bot, Image } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  price: string;
  description?: string;
  imageUrl?: string;
}

export default function BusinessRegister() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo CSV válido",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      // Find name and price columns
      const nameIndex = headers.findIndex(h => 
        h.includes('nombre') || h.includes('producto') || h.includes('name')
      );
      const priceIndex = headers.findIndex(h => 
        h.includes('precio') || h.includes('price') || h.includes('valor')
      );

      if (nameIndex === -1 || priceIndex === -1) {
        toast({
          title: "Error",
          description: "El archivo CSV debe contener columnas 'nombre' y 'precio'",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      const parsedProducts: Product[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length > Math.max(nameIndex, priceIndex)) {
          parsedProducts.push({
            name: values[nameIndex],
            price: values[priceIndex]
          });
        }
        setProgress((i / (lines.length - 1)) * 30);
      }

      // Simulate AI processing for descriptions and images
      for (let i = 0; i < parsedProducts.length; i++) {
        const product = parsedProducts[i];
        
        // Simulate AI description generation
        await new Promise(resolve => setTimeout(resolve, 500));
        product.description = `${product.name} de alta calidad. Producto ideal para uso diario con excelente relación precio-calidad. Disponible en nuestra tienda local.`;
        
        // Simulate AI image generation
        await new Promise(resolve => setTimeout(resolve, 300));
        product.imageUrl = `/api/placeholder/200/200?text=${encodeURIComponent(product.name)}`;
        
        setProgress(30 + ((i + 1) / parsedProducts.length) * 70);
      }

      setProducts(parsedProducts);
      toast({
        title: "¡Importación exitosa!",
        description: `Se procesaron ${parsedProducts.length} productos con descripciones e imágenes generadas por IA`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Error al procesar el archivo CSV",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const exportCSV = () => {
    if (products.length === 0) {
      toast({
        title: "Sin productos",
        description: "No hay productos para exportar",
        variant: "destructive"
      });
      return;
    }

    const headers = ['nombre', 'precio', 'descripcion', 'imagen_url'];
    const csvContent = [
      headers.join(','),
      ...products.map(p => [
        `"${p.name}"`,
        p.price,
        `"${p.description || ''}"`,
        p.imageUrl || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos_procesados.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Exportación exitosa",
      description: "El archivo CSV ha sido descargado",
    });
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

              {/* Products Import Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Upload className="h-5 w-5" />
                  Importar Productos (Opcional)
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Upload Section */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="csvFile">Archivo CSV de Productos</Label>
                      <Input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        disabled={isProcessing}
                      />
                      <p className="text-sm text-muted-foreground">
                        El archivo debe contener columnas 'nombre' y 'precio'
                      </p>
                    </div>

                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Bot className="h-4 w-4 animate-spin" />
                          Procesando con IA...
                        </div>
                        <Progress value={progress} className="w-full" />
                        <p className="text-xs text-muted-foreground">
                          {progress < 30 ? 'Analizando archivo...' : 
                           progress < 80 ? 'Generando descripciones...' : 
                           'Creando imágenes...'}
                        </p>
                      </div>
                    )}

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        Funciones de IA
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Genera descripciones automáticas para cada producto</li>
                        <li>• Crea imágenes con fondo blanco usando IA</li>
                        <li>• Optimiza el contenido para búsquedas locales</li>
                      </ul>
                    </div>

                    {products.length > 0 && (
                      <Button 
                        onClick={exportCSV}
                        variant="outline" 
                        className="w-full gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Exportar CSV Procesado
                      </Button>
                    )}
                  </div>

                  {/* Results Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Productos Procesados ({products.length})
                    </h4>
                    
                    {products.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground bg-muted rounded-lg">
                        <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Sube un archivo CSV para procesar productos</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto bg-muted rounded-lg p-4">
                        {products.map((product, index) => (
                          <div key={index} className="bg-background border rounded-lg p-3 space-y-2">
                            <div className="flex items-start gap-3">
                              {product.imageUrl && (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-md bg-muted"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-sm truncate">{product.name}</h5>
                                <p className="text-sm text-success font-medium">{product.price}</p>
                              </div>
                            </div>
                            
                            {product.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {product.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sample CSV Format */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Formato de Archivo CSV</h4>
                  <div className="bg-background p-3 rounded font-mono text-xs">
                    <div>nombre,precio</div>
                    <div>Smartphone Samsung Galaxy,299990</div>
                    <div>Auriculares Bluetooth,45990</div>
                    <div>Cargador USB-C,12990</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Ejemplo del formato requerido. Las columnas pueden estar en cualquier orden.
                  </p>
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