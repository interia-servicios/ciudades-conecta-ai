import { Star, MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BusinessCardProps {
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  distance?: string;
  isOpen?: boolean;
  phone?: string;
  onClick?: () => void;
}

export const BusinessCard = ({
  name,
  category,
  rating,
  reviews,
  location,
  image,
  distance,
  isOpen = true,
  phone,
  onClick
}: BusinessCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-[var(--transition-smooth)]"
        />
        {distance && (
          <Badge 
            className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-sm"
            variant="secondary"
          >
            {distance}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium text-sm">{rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({reviews} reseñas)</span>
            </div>
            
            {isOpen !== undefined && (
              <Badge variant={isOpen ? "default" : "secondary"} className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {isOpen ? "Abierto" : "Cerrado"}
              </Badge>
            )}
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground line-clamp-2">{location}</span>
          </div>
          
          {phone && (
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Phone className="h-4 w-4" />
              Contactar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};