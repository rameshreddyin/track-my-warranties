
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import {
  Settings,
  User,
  HelpCircle,
  Bell,
  Share,
  Shield,
  Moon,
  LogOut,
  CreditCard,
  Lock,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Menu = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", path: "#" },
        { icon: Bell, label: "Notifications", path: "#" },
        { icon: CreditCard, label: "Subscription", path: "#" },
      ]
    },
    {
      title: "Settings",
      items: [
        { icon: Settings, label: "Preferences", path: "#" },
        { icon: Lock, label: "Privacy & Security", path: "#" },
        { icon: Mail, label: "Communication", path: "#" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", path: "#" },
        { icon: Shield, label: "Terms & Conditions", path: "#" },
        { icon: Share, label: "Share App", path: "#" },
      ]
    }
  ];
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>
        
        <div className="space-y-4">
          {menuSections.map((section) => (
            <Card key={section.title} className="overflow-hidden">
              <div className="p-4 font-medium text-lg">{section.title}</div>
              <Separator />
              <div className="divide-y">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <span>{item.label}</span>
                    </div>
                    <div className="text-muted-foreground">›</div>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
          
          <Card className="overflow-hidden">
            <div className="p-4 font-medium text-lg">Appearance</div>
            <Separator />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-primary" />
                <span>Dark Mode</span>
              </div>
              <Switch />
            </div>
          </Card>
          
          <button
            onClick={handleLogout}
            className="w-full p-4 flex items-center gap-3 justify-center rounded-md border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
