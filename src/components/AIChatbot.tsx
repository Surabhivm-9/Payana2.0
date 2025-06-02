
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, MapPin, Route } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  showRouteInfo?: boolean;
  destinations?: string[];
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your trip planning assistant. Ask me to plan a trip like 'Plan a trip to Goa from Gadag' and I'll help you with route information!",
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');

  const extractTripDetails = (text: string): { from: string; to: string } | null => {
    // Patterns to match trip planning requests
    const patterns = [
      /plan a trip to (.+?) from (.+?)$/i,
      /trip from (.+?) to (.+?)$/i,
      /(.+?) to (.+?) trip$/i,
      /route from (.+?) to (.+?)$/i,
      /show route (.+?) to (.+?)$/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes('from (.+?) to')) {
          return { from: match[1].trim(), to: match[2].trim() };
        } else {
          return { from: match[2].trim(), to: match[1].trim() };
        }
      }
    }

    return null;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false
    };

    const tripDetails = extractTripDetails(inputText.toLowerCase());
    
    let botResponse: Message;
    
    if (tripDetails) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: `Great! I've planned your trip from ${tripDetails.from} to ${tripDetails.to}. To see the detailed route on the map, please check the "Route Map" tab above. You can also add more destinations in the "Trip Planner" section for a complete itinerary.`,
        isBot: true,
        showRouteInfo: true,
        destinations: [tripDetails.from, tripDetails.to]
      };
    } else {
      botResponse = {
        id: (Date.now() + 1).toString(),
        text: "I can help you plan trips! Try asking me something like 'Plan a trip to Goa from Gadag' or 'Show route Mumbai to Delhi' and I'll provide route information. Check the Route Map tab to see the visual route!",
        isBot: true
      };
    }

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Trip Planning Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div
                  className={`flex ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
                {message.showRouteInfo && message.destinations && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2 text-sm text-blue-800">
                      <Route className="h-4 w-4" />
                      Planned Route: {message.destinations.join(' → ')}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <MapPin className="h-3 w-3" />
                      Click on the "Route Map" tab above to see the visual route
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me to plan a trip (e.g., 'Plan a trip to Goa from Gadag')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
