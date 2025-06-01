
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const SOSButton = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [sosMessage, setSosMessage] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Could not get current location. Please enable location services.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const addContact = () => {
    if (newContact.name && newContact.email) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact
      };
      setContacts(prev => [...prev, contact]);
      setNewContact({ name: '', email: '', phone: '' });
      setIsAddingContact(false);
      toast({
        title: "Contact Added",
        description: `${contact.name} has been added to your emergency contacts.`
      });
    }
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const sendSOSAlert = async () => {
    if (contacts.length === 0) {
      toast({
        title: "No Contacts",
        description: "Please add emergency contacts before sending an SOS alert.",
        variant: "destructive"
      });
      return;
    }

    // Get current location
    getCurrentLocation();

    // Simulate sending emails (replace with actual email service integration)
    const locationText = currentLocation 
      ? `Current Location: https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`
      : 'Location not available';

    const emailContent = `
      EMERGENCY ALERT
      
      This is an automated emergency message from Journey Tailor.
      
      Message: ${sosMessage || 'Emergency assistance needed'}
      
      ${locationText}
      
      Timestamp: ${new Date().toLocaleString()}
      
      Please respond immediately.
    `;

    // Here you would integrate with an email service like EmailJS, Firebase Functions, or your backend
    console.log('Sending SOS to contacts:', contacts);
    console.log('Email content:', emailContent);

    toast({
      title: "SOS Alert Sent",
      description: `Emergency alert sent to ${contacts.length} contact(s).`,
    });

    setSosMessage('');
  };

  return (
    <div className="space-y-4">
      <Card className="border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Emergency SOS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sosMessage">Emergency Message (Optional)</Label>
            <Textarea
              id="sosMessage"
              value={sosMessage}
              onChange={(e) => setSosMessage(e.target.value)}
              placeholder="Describe your emergency situation..."
              className="mt-1"
            />
          </div>
          
          <Button
            onClick={sendSOSAlert}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            SEND SOS ALERT
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Emergency Contacts</CardTitle>
            <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Emergency Contact</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactName">Name *</Label>
                    <Input
                      id="contactName"
                      value={newContact.name}
                      onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addContact} className="flex-1">
                      Add Contact
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No emergency contacts added yet.
            </p>
          ) : (
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    {contact.phone && (
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeContact(contact.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSButton;
