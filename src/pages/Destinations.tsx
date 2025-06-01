
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const destinations = [
    {
      id: 1,
      name: "Pacific Coast Highway",
      location: "California, USA",
      category: "coastal",
      duration: "5-7 days",
      rating: 4.9,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80",
      description: "One of the most scenic drives in the world, featuring dramatic coastlines, charming towns, and iconic landmarks.",
      highlights: ["Big Sur", "Monterey Bay", "Hearst Castle", "Golden Gate Bridge"],
      bestTime: "April - October"
    },
    {
      id: 2,
      name: "Blue Ridge Parkway",
      location: "Virginia & North Carolina",
      category: "mountain",
      duration: "4-6 days",
      rating: 4.8,
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
      description: "America's favorite drive through the Appalachian Mountains with stunning fall foliage and mountain vistas.",
      highlights: ["Shenandoah National Park", "Great Smoky Mountains", "Asheville", "Blue Ridge Mountains"],
      bestTime: "September - November"
    },
    {
      id: 3,
      name: "Route 66",
      location: "Illinois to California",
      category: "historic",
      duration: "10-14 days",
      rating: 4.7,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80",
      description: "The historic Mother Road showcasing classic Americana, diners, and desert landscapes.",
      highlights: ["Grand Canyon", "Santa Fe", "Cadillac Ranch", "Route 66 Museum"],
      bestTime: "March - May, September - November"
    },
    {
      id: 4,
      name: "Great Ocean Road",
      location: "Victoria, Australia",
      category: "coastal",
      duration: "3-5 days",
      rating: 4.8,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      description: "Australia's most famous coastal drive featuring the Twelve Apostles and stunning ocean views.",
      highlights: ["Twelve Apostles", "Port Campbell", "Loch Ard Gorge", "Apollo Bay"],
      bestTime: "December - February"
    },
    {
      id: 5,
      name: "Going-to-the-Sun Road",
      location: "Montana, USA",
      category: "mountain",
      duration: "2-3 days",
      rating: 4.9,
      difficulty: "Challenging",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      description: "A spectacular mountain road through Glacier National Park with alpine lakes and glacial peaks.",
      highlights: ["Logan Pass", "Lake McDonald", "Avalanche Creek", "Hidden Lake"],
      bestTime: "June - September"
    },
    {
      id: 6,
      name: "Ring Road",
      location: "Iceland",
      category: "adventure",
      duration: "7-10 days",
      rating: 4.9,
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&q=80",
      description: "Circle Iceland's dramatic landscapes including waterfalls, glaciers, and volcanic formations.",
      highlights: ["Golden Circle", "Blue Lagoon", "Jokulsarlon", "Northern Lights"],
      bestTime: "May - September"
    }
  ];

  const categories = [
    { id: "all", name: "All Routes" },
    { id: "coastal", name: "Coastal" },
    { id: "mountain", name: "Mountain" },
    { id: "historic", name: "Historic" },
    { id: "adventure", name: "Adventure" }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Moderate": return "bg-yellow-100 text-yellow-700";
      case "Challenging": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Routes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of the world's most scenic and memorable road trip destinations.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className={getDifficultyColor(destination.difficulty)}>
                    {destination.difficulty}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.location}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{destination.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Best Time to Visit:</p>
                  <p className="text-sm text-gray-600">{destination.bestTime}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.slice(0, 3).map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                  {destination.highlights.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{destination.highlights.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button asChild className="w-full">
                  <Link to="/planner">Plan This Route</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
