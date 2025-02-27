
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { format, addMonths } from 'date-fns';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Camera, Trash2 } from 'lucide-react';
import { WarrantyFormData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useWarrantyStore } from '@/store/warrantyStore';

const CATEGORIES = [
  'Electronics',
  'Appliances',
  'Furniture',
  'Automotive',
  'Jewelry',
  'Clothing',
  'Tools',
  'Toys',
  'Other',
];

interface WarrantyFormProps {
  existingData?: WarrantyFormData;
  isEditing?: boolean;
  warrantyId?: string;
}

export const WarrantyForm: React.FC<WarrantyFormProps> = ({
  existingData,
  isEditing = false,
  warrantyId,
}) => {
  const { addWarranty, updateWarranty } = useWarrantyStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [receiptPreview, setReceiptPreview] = useState<string | undefined>(
    existingData?.receiptImage
  );
  
  const defaultValues: Partial<WarrantyFormData> = {
    productName: '',
    brand: '',
    category: '',
    purchaseDate: new Date(),
    warrantyPeriod: 12,
    price: undefined,
    receiptImage: undefined,
    notes: '',
    contactPhone: '',
    contactEmail: '',
    contactWebsite: '',
    contactDetails: '',
    ...existingData,
  };
  
  const form = useForm<WarrantyFormData>({
    defaultValues,
  });
  
  const onSubmit = (data: WarrantyFormData) => {
    try {
      if (isEditing && warrantyId) {
        // Calculate expiry date
        const expiryDate = addMonths(data.purchaseDate, data.warrantyPeriod);
        
        // Prepare contact info
        const contactInfo = {
          phone: data.contactPhone,
          email: data.contactEmail,
          website: data.contactWebsite,
          additionalDetails: data.contactDetails,
        };
        
        updateWarranty(warrantyId, {
          productName: data.productName,
          brand: data.brand,
          category: data.category,
          purchaseDate: data.purchaseDate,
          warrantyPeriod: data.warrantyPeriod,
          expiryDate,
          price: data.price,
          receiptImage: data.receiptImage,
          notes: data.notes,
          contactInfo,
        });
        
        toast({
          title: "Warranty updated",
          description: `${data.productName} warranty details have been updated.`,
        });
      } else {
        // Add new warranty
        const id = addWarranty({
          productName: data.productName,
          brand: data.brand,
          category: data.category,
          purchaseDate: data.purchaseDate,
          warrantyPeriod: data.warrantyPeriod,
          price: data.price,
          receiptImage: data.receiptImage,
          notes: data.notes,
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
          contactWebsite: data.contactWebsite,
          contactDetails: data.contactDetails,
        });
        
        toast({
          title: "Warranty added",
          description: `${data.productName} warranty has been added to your collection.`,
        });
        
        navigate(`/warranty/${id}`);
        return;
      }
      
      navigate(-1);
    } catch (error) {
      console.error('Error saving warranty:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your warranty information.",
        variant: "destructive",
      });
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setReceiptPreview(result);
      form.setValue('receiptImage', result);
    };
    reader.readAsDataURL(file);
  };
  
  const removeImage = () => {
    setReceiptPreview(undefined);
    form.setValue('receiptImage', undefined);
  };
  
  // Helper to calculate expiry date based on form values
  const calculateExpiryDate = () => {
    const purchaseDate = form.watch('purchaseDate');
    const warrantyPeriod = form.watch('warrantyPeriod');
    
    if (!purchaseDate || !warrantyPeriod) return null;
    
    return addMonths(purchaseDate, warrantyPeriod);
  };
  
  const expiryDate = calculateExpiryDate();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Product Information</h2>
          
          <FormField
            control={form.control}
            name="productName"
            rules={{ required: "Product name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. iPhone 13 Pro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="brand"
            rules={{ required: "Brand is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Apple" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="purchaseDate"
              rules={{ required: "Purchase date is required" }}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Purchase Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MMM d, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="warrantyPeriod"
              rules={{ 
                required: "Warranty period is required",
                min: { value: 1, message: "Must be at least 1 month" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Period (months)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {expiryDate && (
            <div className="text-sm text-muted-foreground">
              Warranty expires on {format(expiryDate, "MMMM d, yyyy")}
            </div>
          )}
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g. 999.99" 
                    {...field}
                    onChange={(e) => 
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Receipt</h2>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-center">
              {receiptPreview ? (
                <div className="relative">
                  <img 
                    src={receiptPreview} 
                    alt="Receipt" 
                    className="max-h-48 rounded-md object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 h-7 w-7"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <label className="cursor-pointer text-center p-6">
                    <div className="mb-3 bg-muted/50 rounded-full p-3">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-sm font-medium">Add Receipt Photo</div>
                    <p className="text-xs text-muted-foreground mt-1">Tap to upload</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Contact Information</h2>
          
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. (123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Email (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="e.g. support@company.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contactWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Website (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. https://support.company.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contactDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Contact Details (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any other relevant contact information"
                    className="min-h-20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Notes</h2>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any additional information about this warranty"
                    className="min-h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update' : 'Save'} Warranty
          </Button>
        </div>
      </form>
    </Form>
  );
};
