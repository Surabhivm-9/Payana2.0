
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Calendar, Route, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Adventure {
  id: string;
  from: string;
  to: string;
  date: string;
  status: 'planned' | 'completed';
}

interface PastAdventuresProps {
  newAdventure?: { from: string; to: string } | null;
  onViewRoute?: (from: string, to: string) => void;
}

const PastAdventures: React.FC<PastAdventuresProps> = ({ newAdventure, onViewRoute }) => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  // Load adventures from localStorage on component mount
  useEffect(() => {
    const savedAdventures = localStorage.getItem('pastAdventures');
    if (savedAdventures) {
      setAdventures(JSON.parse(savedAdventures));
    }
  }, []);

  // Save new adventure when it's provided
  useEffect(() => {
    if (newAdventure) {
      const adventure: Adventure = {
        id: Date.now().toString(),
        from: newAdventure.from,
        to: newAdventure.to,
        date: new Date().toLocaleDateString(),
        status: 'planned'
      };

      const updatedAdventures = [adventure, ...adventures];
      setAdventures(updatedAdventures);
      localStorage.setItem('pastAdventures', JSON.stringify(updatedAdventures));

      toast({
        title: "Adventure Saved!",
        description: `Your trip from ${newAdventure.from} to ${newAdventure.to} has been saved to past adventures.`
      });
    }
  }, [newAdventure, adventures]);

  const markAsCompleted = (id: string) => {
    const updatedAdventures = adventures.map(adventure =>
      adventure.id === id ? { ...adventure, status: 'completed' as const } : adventure
    );
    setAdventures(updatedAdventures);
    localStorage.setItem('pastAdventures', JSON.stringify(updatedAdventures));
    
    toast({
      title: "Adventure Completed!",
      description: "Great job completing your trip!"
    });
  };

  const viewOnMap = (adventure: Adventure) => {
    onViewRoute?.(adventure.from, adventure.to);
    toast({
      title: "Viewing Route",
      description: `Showing route from ${adventure.from} to ${adventure.to} on map.`
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Past Adventures
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          {adventures.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Route className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No adventures yet!</p>
              <p className="text-sm">Plan a trip using the AI assistant to see it here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {adventures.map((adventure) => (
                <Card key={adventure.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Route className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">
                          {adventure.from} → {adventure.to}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        adventure.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {adventure.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>Planned on {adventure.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewOnMap(adventure)}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Route
                      </Button>
                      {adventure.status === 'planned' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsCompleted(adventure.id)}
                          className="flex-1"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PastAdventures;
