
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    warrantyExpiration: true,
    upcomingExpiration: true,
    emailNotifications: true,
    pushNotifications: true,
    newFeatures: false,
    weeklyDigest: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      
      // Show toast when toggling notification settings
      toast({
        title: newState[key] ? "Notifications enabled" : "Notifications disabled",
        description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${newState[key] ? "enabled" : "disabled"}.`,
      });
      
      return newState;
    });
  };
  
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/menu')}
            className="mr-1"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Warranty Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="warrantyExpiration">Warranty Expiration</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when a warranty expires
                </p>
              </div>
              <Switch 
                id="warrantyExpiration" 
                checked={notifications.warrantyExpiration}
                onCheckedChange={() => handleToggle('warrantyExpiration')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="upcomingExpiration">Upcoming Expirations</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified 30 days before a warranty expires
                </p>
              </div>
              <Switch 
                id="upcomingExpiration" 
                checked={notifications.upcomingExpiration}
                onCheckedChange={() => handleToggle('upcomingExpiration')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch 
                id="emailNotifications" 
                checked={notifications.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch 
                id="pushNotifications" 
                checked={notifications.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Newsletter & Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="newFeatures">Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new features and improvements
                </p>
              </div>
              <Switch 
                id="newFeatures" 
                checked={notifications.newFeatures}
                onCheckedChange={() => handleToggle('newFeatures')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of your warranties
                </p>
              </div>
              <Switch 
                id="weeklyDigest" 
                checked={notifications.weeklyDigest}
                onCheckedChange={() => handleToggle('weeklyDigest')}
              />
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={saveSettings} className="w-full">
          Save Preferences
        </Button>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
