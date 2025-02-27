
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WarrantyCard } from '@/components/warranty/WarrantyCard';
import { useWarrantyStore } from '@/store/warrantyStore';
import { Clock, ShieldCheck } from 'lucide-react';

const AllWarranties = () => {
  const { warranties, getUpcomingExpirations, getExpiredWarranties } = useWarrantyStore();
  const upcomingExpirations = getUpcomingExpirations(30);
  const expiredWarranties = getExpiredWarranties();
  const activeWarranties = warranties.filter(w => !expiredWarranties.some(exp => exp.id === w.id));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="All Warranties" showBackButton />
      <main className="flex-1 container py-4">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 animate-fade-in">
            {warranties.length > 0 ? (
              warranties.map((warranty) => (
                <WarrantyCard key={warranty.id} warranty={warranty} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No warranties found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4 animate-fade-in">
            {activeWarranties.length > 0 ? (
              activeWarranties.map((warranty) => (
                <WarrantyCard key={warranty.id} warranty={warranty} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShieldCheck className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No active warranties</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired" className="space-y-4 animate-fade-in">
            {expiredWarranties.length > 0 ? (
              expiredWarranties.map((warranty) => (
                <WarrantyCard key={warranty.id} warranty={warranty} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No expired warranties</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AllWarranties;
