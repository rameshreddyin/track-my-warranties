
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, ListFilter, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ListFilter, label: 'All', path: '/all' },
    { icon: PlusCircle, label: 'Add', path: '/add' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Menu, label: 'Menu', path: '#', onClick: () => {} }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path}
            className="flex flex-col items-center"
            onClick={item.onClick}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                'rounded-full',
                location.pathname === item.path && 'bg-accent text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Button>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="h-safe-area-bottom" />
    </div>
  );
};
