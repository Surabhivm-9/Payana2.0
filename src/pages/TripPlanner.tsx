
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Users, DollarSign, Plus, X, MessageSquare, AlertTriangle, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import GoogleMap from "@/components/GoogleMap";
import AIChatbot from "@/components/AIChatbot";
import SOSButton from "@/components/SOSButton";
import TripAnalysis from "@/components/TripAnalysis";
import { toast } from "@/hooks/use-toast";

const TripPlanner = () => {
  const [destinations, setDestinations] = useState([""]);
  const [tripData, setTripData] = useState({
    startLocation: "",
    duration: "",
    travelers: "",
    budget: "",
    interests: "",
    notes: ""
  });

  const addDestination = () => {
    setDestinations([...destinations, ""]);
  };

  const removeDestination = (index: number) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

  const updateDestination = (index: number, value: string) => {
    const updated = [...destinations];
    updated[index] = value;
    setDestinations(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trip Plan Created!",
      description: "Your personalized road trip itinerary is being generated. Check the AI Analysis tab for detailed suggestions.",
    });
  };

  const validDestinations = destinations.filter(dest => dest.trim() !== "");
  const allDestinations = tripData.startLocation ? [tripData.startLocation, ...validDestinations] : validDestinations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Road Trip</h1>
          <p className="text-xl text-gray-600">AI-powered trip planning with personalized recommendations</p>
        </div>

        <Tabs defaultValue="planner" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="map">Route Map</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      Trip Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="startLocation">Starting Location *</Label>
                      <Input
                        id="startLocation"
                        placeholder="Enter your starting city (e.g., New York, NY)"
                        value={tripData.startLocation}
                        onChange={(e) => setTripData({...tripData, startLocation: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select onValueChange={(value) => setTripData({...tripData, duration: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Trip length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                            <SelectItem value="week">1 Week</SelectItem>
                            <SelectItem value="two-weeks">2 Weeks</SelectItem>
                            <SelectItem value="month">1 Month+</SelectItem>
                            <SelectItem value="custom">Custom Duration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="travelers">Travelers</Label>
                        <Select onValueChange={(value) => setTripData({...tripData, travelers: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Group size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo Traveler</SelectItem>
                            <SelectItem value="couple">Couple (2 people)</SelectItem>
                            <SelectItem value="family-small">Small Family (3-4 people)</SelectItem>
                            <SelectItem value="family-large">Large Family (5+ people)</SelectItem>
                            <SelectItem value="friends">Friends Group</SelectItem>
                            <SelectItem value="group">Large Group (8+ people)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select onValueChange={(value) => setTripData({...tripData, budget: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget ($200-500)</SelectItem>
                          <SelectItem value="economy">Economy ($500-1000)</SelectItem>
                          <SelectItem value="moderate">Moderate ($1000-2500)</SelectItem>
                          <SelectItem value="comfortable">Comfortable ($2500-5000)</SelectItem>
                          <SelectItem value="luxury">Luxury ($5000+)</SelectItem>
                          <SelectItem value="no-limit">No Budget Limit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                      Destinations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">Add as many destinations as you want to visit during your trip.</p>
                    {destinations.map((destination, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Destination ${index + 1} (e.g., Los Angeles, CA)`}
                          value={destination}
                          onChange={(e) => updateDestination(index, e.target.value)}
                        />
                        {destinations.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeDestination(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addDestination}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Destination
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences & Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="interests">Interests & Activities</Label>
                    <Input
                      id="interests"
                      placeholder="e.g., hiking, photography, local cuisine, museums, nightlife, beaches, history"
                      value={tripData.interests}
                      onChange={(e) => setTripData({...tripData, interests: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes & Requirements</Label>
                    <Textarea
                      id="notes"
                      placeholder="Special requirements, accessibility needs, dietary restrictions, accommodation preferences, or any specific requests..."
                      value={tripData.notes}
                      onChange={(e) => setTripData({...tripData, notes: e.target.value})}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Create My AI-Powered Trip Plan
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="ai-analysis">
            <TripAnalysis tripData={tripData} destinations={validDestinations} />
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Interactive Route Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allDestinations.length >= 2 ? (
                  <GoogleMap 
                    destinations={allDestinations}
                    onRouteCalculated={(route) => {
                      console.log('Route calculated:', route);
                      toast({
                        title: "Route Calculated!",
                        description: `Total distance: ${route.routes[0]?.legs.reduce((total: number, leg: any) => total + leg.distance.value, 0) / 1000}km`
                      });
                    }}
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Add a starting location and at least one destination to see your route</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChatbot />
          </TabsContent>

          <TabsContent value="emergency">
            <SOSButton />
          </TabsContent>
        </Tabs>

        {/* Enhanced Features Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-center">🚀 Enhanced AI-Powered Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold">AI Trip Analysis</h4>
              <p className="text-gray-600 text-sm">Google Gemini AI analyzes your preferences for personalized recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold">Unlimited Destinations</h4>
              <p className="text-gray-600 text-sm">Add as many stops as you want - no more 2-destination limit</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold">Smart Recommendations</h4>
              <p className="text-gray-600 text-sm">Hotels, restaurants, and activities tailored to your group and budget</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold">Detailed Itinerary</h4>
              <p className="text-gray-600 text-sm">Day-by-day planning with timing, costs, and insider tips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
