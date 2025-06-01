
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, DollarSign, Clock, Plus, X } from "lucide-react";
import Navigation from "@/components/Navigation";
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
      description: "Your personalized road trip itinerary is being generated. This would normally save to a database.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Road Trip</h1>
          <p className="text-xl text-gray-600">Tell us about your dream adventure and we'll create the perfect itinerary</p>
        </div>

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
                  <Label htmlFor="startLocation">Starting Location</Label>
                  <Input
                    id="startLocation"
                    placeholder="Enter your starting city"
                    value={tripData.startLocation}
                    onChange={(e) => setTripData({...tripData, startLocation: e.target.value})}
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
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="group">Group (4+)</SelectItem>
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
                      <SelectItem value="budget">Budget ($500-1000)</SelectItem>
                      <SelectItem value="moderate">Moderate ($1000-2500)</SelectItem>
                      <SelectItem value="comfortable">Comfortable ($2500-5000)</SelectItem>
                      <SelectItem value="luxury">Luxury ($5000+)</SelectItem>
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
                {destinations.map((destination, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder={`Destination ${index + 1}`}
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
                  Add Destination
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preferences & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="interests">Interests & Activities</Label>
                <Input
                  id="interests"
                  placeholder="e.g., hiking, photography, local cuisine, museums"
                  value={tripData.interests}
                  onChange={(e) => setTripData({...tripData, interests: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements, accessibility needs, or specific requests..."
                  value={tripData.notes}
                  onChange={(e) => setTripData({...tripData, notes: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
              Create My Trip Plan
            </Button>
          </div>
        </form>

        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold">AI Analysis</h4>
                <p className="text-gray-600 text-sm">Our AI analyzes your preferences and creates a personalized route.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold">Curated Recommendations</h4>
                <p className="text-gray-600 text-sm">Get suggestions for accommodations, restaurants, and activities.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold">Interactive Itinerary</h4>
                <p className="text-gray-600 text-sm">Review and customize your detailed day-by-day itinerary.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
