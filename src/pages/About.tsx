
import { MapPin, Users, Target, Heart, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Payana</span>
            </Link>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Payana
        </h1>
        
        <p className="text-xl text-center mb-16 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're passionate about making travel planning simple, personalized, and unforgettable through the power of AI.
        </p>

        {/* Founders Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative mb-6 mx-auto">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for founder photo */}
                    <Users className="w-20 h-20 text-gray-400" />
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Surabhi V Mahashabde</h3>
              <p className="text-blue-600 font-semibold mb-3">Co-Founder</p>
              <p className="text-gray-600 leading-relaxed">
                Passionate about creating innovative travel solutions and leveraging technology to enhance user experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6 mx-auto">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for founder photo */}
                    <Users className="w-20 h-20 text-gray-400" />
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <Award className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sharavathi I Sutar</h3>
              <p className="text-purple-600 font-semibold mb-3">Co-Founder</p>
              <p className="text-gray-600 leading-relaxed">
                Dedicated to revolutionizing travel planning through AI-powered personalization and seamless user experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">About Us</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                Payana is born from our shared vision of transforming how people plan and experience travel. 
                We believe that every journey should be as unique as the traveler embarking on it. Through cutting-edge 
                AI technology and deep understanding of travel preferences, we create personalized itineraries that 
                turn dreams into reality. Our platform combines the efficiency of artificial intelligence with the 
                human touch of authentic travel experiences, ensuring every trip is memorable and meaningful.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Goal, Vision and Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <Target className="h-16 w-16 text-blue-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Goal</h3>
              <p className="text-gray-700 leading-relaxed">
                To democratize travel planning by making personalized, AI-powered trip recommendations accessible 
                to everyone, regardless of their travel experience or budget constraints.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 text-purple-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the world's most trusted AI travel companion, helping millions of travelers 
                discover hidden gems and create lifelong memories through perfectly curated journeys.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-pink-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To revolutionize travel planning through innovative AI technology, creating seamless, 
                personalized experiences that inspire wanderlust and make every journey extraordinary.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Payana Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Payana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Personalization</h3>
                <p className="text-blue-100">Advanced algorithms that learn your preferences and create tailored itineraries just for you.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Optimization</h3>
                <p className="text-blue-100">Dynamic budget tracking and route optimization to ensure you get the best value for your money.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Local Insights</h3>
                <p className="text-blue-100">Discover hidden gems and authentic experiences recommended by locals and fellow travelers.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Seamless Planning</h3>
                <p className="text-blue-100">From destination selection to detailed itineraries, everything you need in one intuitive platform.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust Payana to create their perfect getaway. Let AI plan your next adventure!
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
            <Link to="/signin">Start Planning Your Trip</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
