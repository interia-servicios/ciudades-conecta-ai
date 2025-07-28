import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, FileText, Bot, Image, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  price: string;
  description?: string;
  imageUrl?: string;
}

export default function ImportProducts() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-[var(--transition-smooth)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-[var(--gradient-primary)] rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">Importar Productos</CardTitle>
              <p className="text-muted-foreground">
                Sube tu archivo CSV y la IA generará descripciones e imágenes automáticamente
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="csvFile">Archivo CSV</Label>
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
                  <FileText className="h-4 w-4" />
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
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Productos Procesados ({products.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Sube un archivo CSV para ver los productos procesados</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md bg-muted"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{product.name}</h4>
                          <p className="text-sm text-success font-medium">{product.price}</p>
                        </div>
                      </div>
                      
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sample CSV Format */}
        <Card className="mt-8 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-lg">Formato de Archivo CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div>nombre,precio</div>
              <div>Smartphone Samsung Galaxy,299990</div>
              <div>Auriculares Bluetooth,45990</div>
              <div>Cargador USB-C,12990</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Ejemplo del formato requerido. Las columnas pueden estar en cualquier orden.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}