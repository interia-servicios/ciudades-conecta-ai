import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  location?: string;
}

export const SearchBar = ({ value, onChange, onSearch, location }: SearchBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center gap-3 p-2 bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar productos o servicios locales..."
            className="border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        
        <div className="flex items-center gap-2 pr-2">
          {location && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          
          <Button 
            onClick={onSearch}
            className="bg-[var(--gradient-primary)] hover:opacity-90 transition-[var(--transition-smooth)] px-6"
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};