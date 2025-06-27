import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  center?: boolean;
}

export const SearchBar = ({ onSearch, initialQuery = "", center = false }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  // Actualiza el valor del input si cambia el valor inicial desde el exterior
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Maneja el envío del formulario y ejecuta la búsqueda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    // Formulario de búsqueda con input y botón
    <form onSubmit={handleSubmit} className={`flex gap-2 mb-0 w-full ${center ? 'justify-center items-center py-2' : ''}`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busquemos..."
        className="flex-1"
        autoComplete="off"
      />
      <Button type="submit">Buscar</Button>
    </form>
  );
};