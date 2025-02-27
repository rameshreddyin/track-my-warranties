
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Warranty, ContactInfo } from '@/lib/types';
import { addMonths, isPast, isWithinInterval, subDays } from 'date-fns';

interface WarrantyState {
  warranties: Warranty[];
  addWarranty: (warranty: Omit<Warranty, 'id' | 'expiryDate' | 'createdAt'>) => void;
  updateWarranty: (id: string, warranty: Partial<Warranty>) => void;
  deleteWarranty: (id: string) => void;
  getWarranty: (id: string) => Warranty | undefined;
  getUpcomingExpirations: (days: number) => Warranty[];
  getExpiredWarranties: () => Warranty[];
  searchWarranties: (query: string) => Warranty[];
  filterWarrantiesByCategory: (category: string) => Warranty[];
}

export const useWarrantyStore = create<WarrantyState>()(
  persist(
    (set, get) => ({
      warranties: [],
      
      addWarranty: (warrantyData) => {
        const id = crypto.randomUUID();
        const createdAt = new Date();
        const expiryDate = addMonths(warrantyData.purchaseDate, warrantyData.warrantyPeriod);
        
        const contactInfo: ContactInfo = {
          phone: warrantyData.contactPhone,
          email: warrantyData.contactEmail,
          website: warrantyData.contactWebsite,
          additionalDetails: warrantyData.contactDetails,
        };
        
        const newWarranty: Warranty = {
          id,
          expiryDate,
          createdAt,
          contactInfo,
          ...warrantyData,
        };
        
        set((state) => ({
          warranties: [...state.warranties, newWarranty],
        }));
        
        return id;
      },
      
      updateWarranty: (id, updatedWarranty) => {
        set((state) => ({
          warranties: state.warranties.map((warranty) =>
            warranty.id === id ? { ...warranty, ...updatedWarranty } : warranty
          ),
        }));
      },
      
      deleteWarranty: (id) => {
        set((state) => ({
          warranties: state.warranties.filter((warranty) => warranty.id !== id),
        }));
      },
      
      getWarranty: (id) => {
        return get().warranties.find((warranty) => warranty.id === id);
      },
      
      getUpcomingExpirations: (days) => {
        const today = new Date();
        const futureDate = addMonths(today, days/30);
        
        return get().warranties.filter((warranty) =>
          isWithinInterval(warranty.expiryDate, {
            start: today,
            end: futureDate,
          })
        );
      },
      
      getExpiredWarranties: () => {
        return get().warranties.filter((warranty) => 
          isPast(warranty.expiryDate)
        );
      },
      
      searchWarranties: (query) => {
        const lowerCaseQuery = query.toLowerCase();
        return get().warranties.filter((warranty) =>
          warranty.productName.toLowerCase().includes(lowerCaseQuery) ||
          warranty.brand.toLowerCase().includes(lowerCaseQuery) ||
          warranty.notes?.toLowerCase().includes(lowerCaseQuery)
        );
      },
      
      filterWarrantiesByCategory: (category) => {
        return get().warranties.filter((warranty) => 
          warranty.category === category
        );
      },
    }),
    {
      name: 'warranty-storage',
    }
  )
);
