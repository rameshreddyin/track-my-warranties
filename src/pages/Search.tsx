
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { WarrantyCard } from '@/components/warranty/WarrantyCard';
import { useWarrantyStore } from '@/store/warrantyStore';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const { warranties, searchWarranties } = useWarrantyStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(warranties);
  
  useEffect(() => {
    if (query.trim() === '') {
      setResults(warranties);
    } else {
      setResults(searchWarranties(query));
    }
  }, [query, warranties, searchWarranties]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Search" showBackButton />
      <main className="flex-1 container py-4">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search warranties..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((warranty) => (
              <WarrantyCard key={warranty.id} warranty={warranty} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <SearchIcon className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No warranties found matching your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
