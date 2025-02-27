
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { WarrantyForm } from '@/components/warranty/WarrantyForm';
import { useWarrantyStore } from '@/store/warrantyStore';
import { WarrantyFormData } from '@/lib/types';

const EditWarranty = () => {
  const { id } = useParams<{ id: string }>();
  const { getWarranty } = useWarrantyStore();
  const warranty = getWarranty(id!);
  
  if (!warranty) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Edit Warranty" showBackButton />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <h2 className="text-xl font-medium mb-2">Warranty Not Found</h2>
            <p className="text-muted-foreground">This warranty may have been deleted or doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Transform warranty data into form data format
  const formData: WarrantyFormData = {
    productName: warranty.productName,
    brand: warranty.brand,
    category: warranty.category,
    purchaseDate: warranty.purchaseDate,
    warrantyPeriod: warranty.warrantyPeriod,
    price: warranty.price,
    receiptImage: warranty.receiptImage,
    notes: warranty.notes,
    contactPhone: warranty.contactInfo?.phone,
    contactEmail: warranty.contactInfo?.email,
    contactWebsite: warranty.contactInfo?.website,
    contactDetails: warranty.contactInfo?.additionalDetails,
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Edit Warranty" showBackButton />
      <main className="flex-1 container py-4 pb-8">
        <WarrantyForm 
          existingData={formData} 
          isEditing={true} 
          warrantyId={id}
        />
      </main>
    </div>
  );
};

export default EditWarranty;
