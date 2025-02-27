
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WarrantyForm } from '@/components/warranty/WarrantyForm';
import { Header } from '@/components/layout/Header';

const AddWarranty = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Add Warranty" showBackButton />
      <main className="flex-1 container py-4 pb-8">
        <WarrantyForm />
      </main>
    </div>
  );
};

export default AddWarranty;
