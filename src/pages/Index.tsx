
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Route, Calendar, Users, Star, ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const destinations = [
    {
      id: 1,
      name: "Goa Beaches",
      location: "Goa, India",
      duration: "3-5 days",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80",
      description: "Beautiful beaches, vibrant nightlife, and Portuguese heritage.",
      highlights: ["Baga Beach", "Anjuna Beach", "Old Goa"]
    },
    {
      id: 2,
      name: "Kerala Backwaters",
      location: "Kerala, India",
      duration: "4-6 days",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80",
      description: "Serene backwaters, lush greenery, and traditional houseboats.",
      highlights: ["Alleppey", "Kumarakom", "Munnar"]
    },
    {
      id: 3,
      name: "Rajasthan Heritage",
      location: "Rajasthan, India",
      duration: "7-10 days",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80",
      description: "Royal palaces, desert landscapes, and rich cultural heritage.",
      highlights: ["Jaipur", "Udaipur", "Jaisalmer"]
    },
    {
      id: 4,
      name: "Himachal Adventures",
      location: "Himachal Pradesh, India",
      duration: "5-8 days",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      description: "Snow-capped mountains, adventure sports, and hill stations.",
      highlights: ["Manali", "Shimla", "Dharamshala"]
    },
    {
      id: 5,
      name: "Tamil Nadu Temples",
      location: "Tamil Nadu, India",
      duration: "6-8 days",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80",
      description: "Ancient temples, classical dance, and South Indian culture.",
      highlights: ["Madurai", "Thanjavur", "Kanchipuram"]
    },
    {
      id: 6,
      name: "Karnataka Wonders",
      location: "Karnataka, India",
      duration: "5-7 days",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&q=80",
      description: "Historic ruins, coffee plantations, and diverse landscapes.",
      highlights: ["Hampi", "Coorg", "Mysore"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Journey Tailor</span>
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Plan Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                {" "}Dream Trip
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover incredible destinations across India, create personalized itineraries, 
              and make memories that last a lifetime with AI-powered trip planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/signin">
                  Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20">
                <Link to="#destinations">
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Destinations Section */}
      <section id="destinations" className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Amazing Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most beautiful and culturally rich destinations across India, 
              each offering unique experiences and unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <Calendar className="h-4 w-4 mr-1" />
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
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link to="/signin">Plan This Trip</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Journey Tailor</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your ultimate companion for planning unforgettable trips across India. 
                Discover new destinations, create personalized itineraries, and make memories that last a lifetime.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/signin" className="text-gray-400 hover:text-white transition-colors">Trip Planner</Link></li>
                <li><Link to="#destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    hello@journeytailor.com
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Journey Tailor. All rights reserved. Made with ❤️ for travelers across India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
