
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🌟 Hi! I'm your advanced AI trip planning assistant powered by the latest AI technology. I can help you with detailed trip planning, including:\n\n• Multi-destination route optimization\n• Budget-specific recommendations\n• Real-time travel insights\n• Local hidden gems and insider tips\n• Weather and seasonal advice\n• Cultural and safety information\n\nWhat would you like to explore for your next adventure?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Enhanced AI response simulation
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateEnhancedAIResponse(input),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateEnhancedAIResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('beach') || lowercaseInput.includes('ocean') || lowercaseInput.includes('coastal')) {
      return "🏖️ Excellent choice for coastal adventures! Here are some premium beach destinations:\n\n🌊 **Pacific Coast Highway (California)**\n• Best time: May-September\n• Highlights: Big Sur, Monterey Bay, Santa Barbara\n• Budget: $150-400/day depending on luxury level\n• Must-do: Sunset at McWay Falls, wine tasting in Paso Robles\n\n🏝️ **Outer Banks (North Carolina)**\n• Best time: April-October\n• Highlights: Wild horses, Wright Brothers Memorial, Cape Hatteras\n• Budget: $100-250/day\n• Must-do: Climb Cape Hatteras Lighthouse, visit Duck\n\nWould you like me to create a detailed 7-day itinerary for either route with specific hotel and restaurant recommendations?";
    } else if (lowercaseInput.includes('mountain') || lowercaseInput.includes('hiking') || lowercaseInput.includes('nature')) {
      return "🏔️ Perfect for mountain enthusiasts! Here are some spectacular mountain routes:\n\n⛰️ **Rocky Mountain National Park Circuit**\n• Best time: June-September (high elevation)\n• Route: Denver → Estes Park → Grand Lake → Colorado Springs\n• Budget: $120-300/day\n• Activities: Trail Ridge Road, hiking Bear Lake, hot springs in Glenwood\n\n🌲 **Blue Ridge Parkway**\n• Best time: April-May (spring blooms), October (fall colors)\n• Route: Shenandoah NP to Great Smoky Mountains\n• Budget: $80-200/day\n• Activities: Skyline Drive, waterfall hikes, mountain music venues\n\nI can provide detailed hiking trail recommendations, elevation profiles, and weather considerations for any season. What's your hiking experience level?";
    } else if (lowercaseInput.includes('city') || lowercaseInput.includes('urban') || lowercaseInput.includes('nightlife')) {
      return "🏙️ Great choice for urban exploration! Here are some exciting city-hopping routes:\n\n🌃 **Northeast Megalopolis**\n• Route: Boston → NYC → Philadelphia → Washington DC\n• Duration: 7-10 days\n• Budget: $200-500/day (varies greatly by city)\n• Highlights: Freedom Trail, Broadway shows, Smithsonian museums\n• Food scene: Italian North End, NYC delis, Philly cheesesteaks, DC food trucks\n\n🎭 **Texas Triangle Plus**\n• Route: Austin → Houston → San Antonio → Dallas\n• Duration: 8-12 days\n• Budget: $120-300/day\n• Highlights: Live music, NASA Space Center, River Walk, BBQ culture\n\nI can recommend specific neighborhoods to stay in, must-visit local spots, and help you navigate public transportation. What type of urban experiences interest you most?";
    } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('cheap') || lowercaseInput.includes('affordable')) {
      return "💰 Smart budgeting! Here are some amazing budget-friendly road trip strategies:\n\n🏕️ **Budget Route: National Parks Circuit**\n• Camping: $10-30/night vs hotels $80-200/night\n• Route: Start with America the Beautiful Pass ($80 for year)\n• Food: Grocery stores + campfire cooking = $15-25/day vs restaurants $40-80/day\n• Free activities: Hiking, scenic drives, ranger programs\n\n🏠 **Money-Saving Tips:**\n• Apps: GasBuddy, Roadtrippers, Campendium\n• Stay: State parks, KOAs, Airbnb (with kitchen)\n• Eat: Pack lunches, local farmers markets\n• Travel: Avoid peak seasons, book accommodations in advance\n\nI can create a detailed budget breakdown for any route. What's your target daily budget per person?";
    } else if (lowercaseInput.includes('food') || lowercaseInput.includes('restaurant') || lowercaseInput.includes('cuisine')) {
      return "🍽️ A foodie adventure awaits! Here are some incredible culinary road trip routes:\n\n🌮 **Southern BBQ & Soul Food Trail**\n• Route: Kansas City → Memphis → Nashville → Atlanta → Charleston\n• Specialties: KC burnt ends, Memphis dry rub, Nashville hot chicken, Georgia peaches, Lowcountry boil\n• Budget: $40-100/day for meals\n• Must-visit: Joe's Kansas City, Central BBQ, Husk, The Optimist\n\n🦞 **New England Seafood Circuit**\n• Route: Boston → Portland ME → Burlington VT → White Mountains NH\n• Specialties: Clam chowder, lobster rolls, maple syrup, craft beer\n• Seasonal: Best May-October for fresh seafood\n• Budget: $50-120/day for meals\n\nI can provide restaurant reservations tips, food festival calendars, and local food market schedules. Any dietary restrictions or specific cuisines you're craving?";
    } else {
      return "🎯 I'd love to help you plan the perfect trip! To give you the most personalized recommendations, could you tell me:\n\n📍 **Travel Preferences:**\n• What regions or states interest you?\n• Preferred travel dates or season?\n• Group size and ages?\n• Activity interests (adventure, relaxation, culture, food)?\n• Accommodation style (camping, hotels, unique stays)?\n\n💡 **Pro Tip:** The more details you share, the better I can tailor recommendations for hidden gems, optimal routes, and insider experiences that match your style and budget.\n\n🗺️ I can also help with:\n• Multi-stop route optimization\n• Real-time weather and road conditions\n• Local events and festivals\n• Safety tips and travel advisories\n\nWhat aspect of trip planning would you like to dive into first?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Advanced AI Trip Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.isUser ? 'bg-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-r from-gray-50 to-blue-50 text-gray-900 border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 text-gray-900 border p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your trip... (destinations, budget, activities, etc.)"
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
