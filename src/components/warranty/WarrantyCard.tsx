
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock } from 'lucide-react';
import { formatDistanceToNow, format, isPast } from 'date-fns';
import { cn } from '@/lib/utils';
import { Warranty } from '@/lib/types';

interface WarrantyCardProps {
  warranty: Warranty;
  className?: string;
}

export const WarrantyCard: React.FC<WarrantyCardProps> = ({ warranty, className }) => {
  const navigate = useNavigate();
  const isExpired = isPast(warranty.expiryDate);
  
  const getStatusColor = () => {
    if (isExpired) return "destructive";
    
    // If expiry date is within 30 days, it's "warning"
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    if (warranty.expiryDate < thirtyDaysFromNow) {
      return "warning"; // Tailwind will use our accent color for this
    }
    
    return "default";
  };
  
  return (
    <Card 
      className={cn(
        "warranty-card overflow-hidden transition-all cursor-pointer hover:shadow-md border",
        className
      )}
      onClick={() => navigate(`/warranty/${warranty.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg line-clamp-1">{warranty.productName}</h3>
            <p className="text-muted-foreground text-sm line-clamp-1">{warranty.brand}</p>
          </div>
          <Badge 
            variant={getStatusColor() as "default" | "destructive" | "secondary"}
            className={cn(
              "ml-2",
              getStatusColor() === "warning" && "bg-accent text-accent-foreground"
            )}
          >
            {isExpired ? 'Expired' : 'Active'}
          </Badge>
        </div>
        
        <div className="flex items-center text-muted-foreground mt-3 text-sm">
          <div className="flex items-center mr-4">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5 opacity-70" />
            <span>{format(warranty.purchaseDate, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 opacity-70" />
            <span>
              {isExpired 
                ? `Expired ${formatDistanceToNow(warranty.expiryDate, { addSuffix: true })}` 
                : `Expires ${formatDistanceToNow(warranty.expiryDate, { addSuffix: true })}`}
            </span>
          </div>
        </div>
        
        <Badge variant="outline" className="mt-3">
          {warranty.category}
        </Badge>
      </CardContent>
    </Card>
  );
};
