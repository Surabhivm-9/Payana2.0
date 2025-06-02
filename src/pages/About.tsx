
import { MapPin, Users, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Journey Tailor</span>
            </Link>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">About Journey Tailor</h1>
        
        <div className="prose prose-lg mx-auto text-gray-600">
          <p className="text-xl text-center mb-12">
            We're passionate about making travel planning simple, personalized, and unforgettable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p>To make travel planning effortless by providing AI-powered, personalized trip recommendations that match your unique preferences and budget.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Heart className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p>To become the most trusted companion for travelers, helping them discover hidden gems and create memories that last a lifetime.</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Why Choose Journey Tailor?</h2>
            <ul className="text-left space-y-4 max-w-2xl mx-auto">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600">•</span>
                <span>AI-powered personalized recommendations</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600">•</span>
                <span>Real-time budget tracking and optimization</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600">•</span>
                <span>Comprehensive itinerary planning</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600">•</span>
                <span>Local insights and hidden gems</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
