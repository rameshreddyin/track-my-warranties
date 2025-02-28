
import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { LayoutProps } from '@/lib/types';
import { useLocation } from 'react-router-dom';

export const Layout: React.FC<LayoutProps> = ({
  children,
  hideHeader = false,
  ...props
}) => {
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background animate-fade-in">
      {!hideHeader && (
        <Header 
          showBackButton={isMenuPage}
          showAddButton={!isMenuPage}
          showNotifications={!isMenuPage}
          title={isMenuPage ? 'Menu' : ''}
        />
      )}
      <main className="flex-1 container py-4 pb-24">
        <div className="animate-slide-up">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
