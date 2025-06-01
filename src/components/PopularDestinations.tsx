
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Pacific Coast Highway",
      location: "California, USA",
      duration: "5-7 days",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&q=80",
      description: "Stunning coastal views, charming seaside towns, and iconic landmarks.",
      highlights: ["Big Sur", "Monterey Bay", "Golden Gate Bridge"]
    },
    {
      id: 2,
      name: "Blue Ridge Parkway",
      location: "Virginia & North Carolina, USA",
      duration: "4-6 days",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
      description: "Scenic mountain vistas, fall foliage, and Appalachian culture.",
      highlights: ["Shenandoah Valley", "Great Smoky Mountains", "Asheville"]
    },
    {
      id: 3,
      name: "Route 66",
      location: "Illinois to California, USA",
      duration: "10-14 days",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80",
      description: "Historic highway with classic Americana and desert landscapes.",
      highlights: ["Grand Canyon", "Santa Fe", "Chicago"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Road Trip Routes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover some of the most scenic and beloved road trip destinations, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination) => (
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
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.location}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link to="/planner">Plan This Route</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/destinations">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
