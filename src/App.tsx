
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddWarranty from "./pages/AddWarranty";
import WarrantyDetails from "./pages/WarrantyDetails";
import EditWarranty from "./pages/EditWarranty";
import Search from "./pages/Search";
import AllWarranties from "./pages/AllWarranties";
import Menu from "./pages/Menu";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/add" element={<AddWarranty />} />
          <Route path="/warranty/:id" element={<WarrantyDetails />} />
          <Route path="/edit/:id" element={<EditWarranty />} />
          <Route path="/search" element={<Search />} />
          <Route path="/all" element={<AllWarranties />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
