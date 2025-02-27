
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, ChevronLeft, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  showNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showAddButton = false,
  showNotifications = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const pageTitle = title || (isHome ? 'My Warranties' : '');
  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="mr-1"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className={cn(
            "font-semibold text-xl",
            showBackButton && "ml-1"
          )}>
            {pageTitle}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showNotifications && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/search')}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {showAddButton && (
            <Button 
              variant="default" 
              size="sm"
              onClick={() => navigate('/add')}
              className="ml-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span>Add</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
