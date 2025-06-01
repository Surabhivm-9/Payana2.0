
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin, Utensils, Bed, Activity, Calendar, DollarSign, Lightbulb, Package } from 'lucide-react';
import { GeminiService } from '@/services/geminiService';
import { toast } from '@/hooks/use-toast';

interface TripAnalysisProps {
  tripData: {
    startLocation: string;
    duration: string;
    travelers: string;
    budget: string;
    interests: string;
    notes: string;
  };
  destinations: string[];
}

const TripAnalysis: React.FC<TripAnalysisProps> = ({ tripData, destinations }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleAnalysis = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google Gemini API key to get AI analysis.",
        variant: "destructive"
      });
      return;
    }

    if (!tripData.startLocation || destinations.filter(d => d.trim()).length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide starting location and at least one destination.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const geminiService = new GeminiService(apiKey);
      const result = await geminiService.analyzeTripData({
        startingPoint: tripData.startLocation,
        destinations: destinations.filter(d => d.trim()),
        duration: tripData.duration,
        travelers: tripData.travelers,
        budget: tripData.budget,
        interests: tripData.interests,
        notes: tripData.notes
      });
      
      setAnalysis(result);
      toast({
        title: "Analysis Complete!",
        description: "Your personalized trip suggestions are ready."
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your trip. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!analysis) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              AI Trip Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="gemini-key">Google Gemini API Key</Label>
              <Input
                id="gemini-key"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google AI Studio</a>
              </p>
            </div>
            <Button 
              onClick={handleAnalysis} 
              disabled={isLoading || !apiKey.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Trip...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get AI Analysis & Suggestions
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Accommodations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-blue-600" />
            Recommended Accommodations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.accommodations?.map((hotel: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{hotel.name}</h4>
                <p className="text-sm text-gray-600">{hotel.type} • {hotel.location}</p>
                <p className="text-sm">{hotel.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">{hotel.priceRange}</span>
                  <span className="text-sm">⭐ {hotel.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Restaurants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-600" />
            Restaurant Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.restaurants?.map((restaurant: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{restaurant.name}</h4>
                <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.location}</p>
                <p className="text-sm">{restaurant.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">{restaurant.priceRange}</span>
                  <span className="text-sm">⭐ {restaurant.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Activities & Attractions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.activities?.map((activity: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{activity.name}</h4>
                <p className="text-sm text-gray-600">{activity.type} • {activity.location}</p>
                <p className="text-sm">{activity.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">{activity.cost}</span>
                  <span className="text-sm">{activity.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Itinerary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Suggested Itinerary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.itinerary?.map((day: any, index: number) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Day {day.day} - {day.location}</h4>
                <div className="mt-2 space-y-1">
                  <p><strong>Activities:</strong> {day.activities.join(', ')}</p>
                  <p><strong>Accommodation:</strong> {day.accommodation}</p>
                  <p><strong>Meals:</strong> {day.meals.join(', ')}</p>
                  {day.notes && <p><strong>Notes:</strong> {day.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Cost Estimate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{analysis.totalEstimatedCost}</p>
            <p className="text-sm text-gray-600">Best time to visit: {analysis.bestTimeToVisit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Packing List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {analysis.packingList?.map((item: string, index: number) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Travel Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Travel Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {analysis.travelTips?.map((tip: string, index: number) => (
              <li key={index} className="text-sm">{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={() => setAnalysis(null)}
          variant="outline"
        >
          Generate New Analysis
        </Button>
      </div>
    </div>
  );
};

export default TripAnalysis;
