
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useWarrantyStore } from '@/store/warrantyStore';
import {
  Calendar,
  Clock,
  Edit,
  Phone,
  Mail,
  Globe,
  Trash,
  Tag,
  Receipt,
  Info,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/Header';

export const WarrantyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { getWarranty, deleteWarranty } = useWarrantyStore();
  const warranty = getWarranty(id!);
  
  if (!warranty) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Warranty Not Found" showBackButton />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h2 className="text-xl font-medium mb-2">Warranty Not Found</h2>
          <p className="text-muted-foreground mb-6">This warranty may have been deleted or doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }
  
  const handleDelete = () => {
    deleteWarranty(warranty.id);
    
    toast({
      title: "Warranty deleted",
      description: `${warranty.productName} warranty has been deleted.`,
    });
    
    navigate('/');
  };
  
  const isExpired = new Date() > warranty.expiryDate;
  
  const formattedPrice = warranty.price 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(warranty.price)
    : null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={warranty.productName} 
        showBackButton 
      />
      
      <div className="flex-1 container py-4 pb-8 animate-slide-up">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-semibold">{warranty.productName}</h1>
            <p className="text-muted-foreground">{warranty.brand}</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/edit/${warranty.id}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" className="text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Warranty</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this warranty? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        <Badge 
          variant={isExpired ? "destructive" : "default"}
          className="mb-6"
        >
          {isExpired ? 'Expired' : 'Active'}
        </Badge>
        
        <Card className="mb-6">
          <div className="p-4 space-y-3">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-muted-foreground">Purchase Date:</span>
              <span className="ml-2 font-medium">
                {format(warranty.purchaseDate, 'MMMM d, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-muted-foreground">Warranty Period:</span>
              <span className="ml-2 font-medium">
                {warranty.warrantyPeriod} {warranty.warrantyPeriod === 1 ? 'month' : 'months'}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-muted-foreground">Expiry Date:</span>
              <span className="ml-2 font-medium">
                {format(warranty.expiryDate, 'MMMM d, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <Tag className="h-4 w-4 mr-2" />
              <span className="text-muted-foreground">Category:</span>
              <span className="ml-2 font-medium">
                {warranty.category}
              </span>
            </div>
            
            {formattedPrice && (
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="text-muted-foreground">Price:</span>
                <span className="ml-2 font-medium">
                  {formattedPrice}
                </span>
              </div>
            )}
          </div>
        </Card>
        
        {warranty.receiptImage && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Receipt</h2>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={warranty.receiptImage} 
                alt="Receipt" 
                className="w-full object-contain max-h-80"
              />
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Contact Information</h2>
          
          <Card className="divide-y">
            {warranty.contactInfo?.phone && (
              <div className="flex items-center p-4">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <a href={`tel:${warranty.contactInfo.phone}`} className="text-primary">
                  {warranty.contactInfo.phone}
                </a>
              </div>
            )}
            
            {warranty.contactInfo?.email && (
              <div className="flex items-center p-4">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <a href={`mailto:${warranty.contactInfo.email}`} className="text-primary">
                  {warranty.contactInfo.email}
                </a>
              </div>
            )}
            
            {warranty.contactInfo?.website && (
              <div className="flex items-center p-4">
                <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                <a 
                  href={warranty.contactInfo.website.startsWith('http') 
                    ? warranty.contactInfo.website 
                    : `https://${warranty.contactInfo.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  {warranty.contactInfo.website}
                </a>
              </div>
            )}
            
            {warranty.contactInfo?.additionalDetails && (
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>Additional Contact Details</span>
                </div>
                <p className="text-sm text-muted-foreground pl-7">
                  {warranty.contactInfo.additionalDetails}
                </p>
              </div>
            )}
            
            {!warranty.contactInfo?.phone && 
             !warranty.contactInfo?.email && 
             !warranty.contactInfo?.website && 
             !warranty.contactInfo?.additionalDetails && (
              <div className="p-4 text-center text-muted-foreground">
                No contact information available
              </div>
            )}
          </Card>
        </div>
        
        {warranty.notes && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Notes</h2>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {warranty.notes}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
