
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
  Lock,
  Mail,
  Smartphone,
  Clock,
  Languages,
  CloudUpload,
  FileText,
  ExternalLink
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
        { 
          icon: User, 
          label: "Profile", 
          path: "#",
          description: "Manage your personal information"
        },
        { 
          icon: Bell, 
          label: "Notifications", 
          path: "#",
          description: "Control how you're notified"
        },
      ]
    },
    {
      title: "Settings",
      items: [
        { 
          icon: Settings, 
          label: "Preferences", 
          path: "#",
          description: "Customize your app experience"
        },
        { 
          icon: Lock, 
          label: "Privacy & Security", 
          path: "#",
          description: "Manage your data and security options"
        },
        { 
          icon: Mail, 
          label: "Communication", 
          path: "#",
          description: "Control your email preferences"
        },
        { 
          icon: Smartphone, 
          label: "Device Settings", 
          path: "#",
          description: "Configure device-specific options"
        },
        { 
          icon: Clock, 
          label: "Warranty Reminders", 
          path: "#", 
          description: "Set up notification timing"
        },
        { 
          icon: CloudUpload, 
          label: "Backup & Restore", 
          path: "#", 
          description: "Manage your warranty data"
        }
      ]
    },
    {
      title: "Support",
      items: [
        { 
          icon: HelpCircle, 
          label: "Help Center", 
          path: "#",
          description: "Get help with using the app"
        },
        { 
          icon: FileText, 
          label: "Terms & Conditions", 
          path: "#",
          description: "Review our legal information"
        },
        { 
          icon: Shield, 
          label: "Privacy Policy", 
          path: "#",
          description: "Learn how we protect your data"
        },
        { 
          icon: Share, 
          label: "Share App", 
          path: "#",
          description: "Tell others about this app"
        },
        { 
          icon: ExternalLink, 
          label: "Visit Our Website", 
          path: "#", 
          description: "Learn more about our services"
        }
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
                      <div className="flex flex-col">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
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
                <div className="flex flex-col">
                  <span className="font-medium">Dark Mode</span>
                  <span className="text-xs text-muted-foreground">Switch between light and dark themes</span>
                </div>
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
