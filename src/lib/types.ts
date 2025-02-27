
import { ReactNode } from "react";

export interface Warranty {
  id: string;
  productName: string;
  brand: string;
  category: string;
  purchaseDate: Date;
  warrantyPeriod: number; // in months
  expiryDate: Date;
  price?: number;
  receiptImage?: string;
  notes?: string;
  contactInfo?: ContactInfo;
  createdAt: Date;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  additionalDetails?: string;
}

export interface WarrantyFormData {
  productName: string;
  brand: string;
  category: string;
  purchaseDate: Date;
  warrantyPeriod: number;
  price?: number;
  receiptImage?: string;
  notes?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactWebsite?: string;
  contactDetails?: string;
}

export interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}
