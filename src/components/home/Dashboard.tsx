
import React, { useState, useEffect } from 'react';
import { useWarrantyStore } from '@/store/warrantyStore';
import { WarrantyCard } from '@/components/warranty/WarrantyCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Clock, Plus, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const Dashboard: React.FC = () => {
  const { warranties, getUpcomingExpirations, getExpiredWarranties } = useWarrantyStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeWarranties, setActiveWarranties] = useState(0);
  const [progress, setProgress] = useState(0);

  const upcomingExpirations = getUpcomingExpirations(30);
  const expiredWarranties = getExpiredWarranties();
  
  useEffect(() => {
    const active = warranties.length - expiredWarranties.length;
    setActiveWarranties(active);
    
    // Calculate progress
    const total = warranties.length;
    const progressValue = total > 0 ? (active / total) * 100 : 0;
    
    // Animate progress
    let start = 0;
    const animateProgress = () => {
      start += 2;
      setProgress(Math.min(start, progressValue));
      if (start < progressValue) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, [warranties, expiredWarranties]);
  
  const handleAddWarranty = () => {
    navigate('/add');
  };
  
  const handleShowAll = () => {
    navigate('/all');
  };
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{activeWarranties}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2 text-accent" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{upcomingExpirations.length}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Health Progress */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Warranty Health</CardTitle>
          <CardDescription>
            {activeWarranties} of {warranties.length} warranties active
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>
      
      {/* Warranty Lists */}
      <div className="mt-8">
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upcoming">Expiring Soon</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4 animate-fade-in">
            {upcomingExpirations.length > 0 ? (
              <>
                {upcomingExpirations.slice(0, 3).map((warranty) => (
                  <WarrantyCard 
                    key={warranty.id} 
                    warranty={warranty} 
                  />
                ))}
                
                {upcomingExpirations.length > 3 && (
                  <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center py-6 mt-2"
                    onClick={handleShowAll}
                  >
                    <span>View all expiring warranties</span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No upcoming warranty expirations</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired" className="space-y-4 animate-fade-in">
            {expiredWarranties.length > 0 ? (
              <>
                {expiredWarranties.slice(0, 3).map((warranty) => (
                  <WarrantyCard 
                    key={warranty.id} 
                    warranty={warranty} 
                  />
                ))}
                
                {expiredWarranties.length > 3 && (
                  <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center py-6 mt-2"
                    onClick={handleShowAll}
                  >
                    <span>View all expired warranties</span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShieldCheck className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No expired warranties</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Warranty Button (if no warranties yet) */}
      {warranties.length === 0 && (
        <div className="mt-8 text-center">
          <Button 
            variant="default" 
            size="lg" 
            className="gap-2"
            onClick={handleAddWarranty}
          >
            <Plus className="h-5 w-5" />
            Add Your First Warranty
          </Button>
        </div>
      )}
    </div>
  );
};
