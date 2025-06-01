
import { Button } from "@/components/ui/button";
import { MapPin, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Journey Tailor</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/planner" className="text-gray-700 hover:text-blue-600 transition-colors">
              Plan Trip
            </Link>
            <Link to="/destinations" className="text-gray-700 hover:text-blue-600 transition-colors">
              Destinations
            </Link>
            <Button asChild>
              <Link to="/planner">Start Planning</Link>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/planner" className="text-gray-700 hover:text-blue-600 transition-colors">
                Plan Trip
              </Link>
              <Link to="/destinations" className="text-gray-700 hover:text-blue-600 transition-colors">
                Destinations
              </Link>
              <Button asChild className="w-full">
                <Link to="/planner">Start Planning</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
