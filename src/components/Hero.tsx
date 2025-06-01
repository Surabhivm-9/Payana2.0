
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Route } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
              {" "}Road Trip
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover scenic routes, hidden gems, and unforgettable experiences. 
            Create personalized itineraries tailored to your interests and travel style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/planner">
                Start Planning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/destinations">
                Explore Destinations
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Destination Discovery</h3>
            <p className="text-gray-600">Find hidden gems and popular attractions along your route with AI-powered recommendations.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Route className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Optimized Routes</h3>
            <p className="text-gray-600">Get the most scenic and efficient routes with real-time traffic updates and road conditions.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ArrowRight className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Experiences</h3>
            <p className="text-gray-600">Customize your journey based on interests, budget, and travel preferences.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
