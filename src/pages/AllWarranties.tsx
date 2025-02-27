
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useWarrantyStore } from '@/store/warrantyStore';
import { WarrantyCard } from '@/components/warranty/WarrantyCard';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AllWarranties = () => {
  const { warranties, filterWarrantiesByCategory, searchWarranties, getExpiredWarranties } = useWarrantyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(warranties.map(w => w.category))];
  
  const filteredWarranties = category === 'all' 
    ? warranties 
    : filterWarrantiesByCategory(category);
  
  const displayedWarranties = searchQuery 
    ? searchWarranties(searchQuery) 
    : filteredWarranties;
  
  const expiredWarranties = getExpiredWarranties();
  const activeWarranties = warranties.filter(w => !expiredWarranties.includes(w));
  
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">All Warranties</h1>
        
        {/* Search and Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search warranties..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Warranty Lists */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">All ({warranties.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeWarranties.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired ({expiredWarranties.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {displayedWarranties.length > 0 ? (
              displayedWarranties.map(warranty => (
                <WarrantyCard key={warranty.id} warranty={warranty} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No warranties found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {activeWarranties.length > 0 ? (
              activeWarranties
                .filter(w => searchQuery ? w.productName.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                .filter(w => category !== 'all' ? w.category === category : true)
                .map(warranty => (
                  <WarrantyCard key={warranty.id} warranty={warranty} />
                ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active warranties</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired" className="space-y-4">
            {expiredWarranties.length > 0 ? (
              expiredWarranties
                .filter(w => searchQuery ? w.productName.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                .filter(w => category !== 'all' ? w.category === category : true)
                .map(warranty => (
                  <WarrantyCard key={warranty.id} warranty={warranty} />
                ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No expired warranties</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AllWarranties;
