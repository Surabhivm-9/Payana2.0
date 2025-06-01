
import { Calendar, Users, Star, Shield, Clock, Camera } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Plan multi-day trips with customizable itineraries that adapt to your timeline."
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Collaborate with friends and family to create the perfect group adventure."
    },
    {
      icon: Star,
      title: "Curated Recommendations",
      description: "Discover top-rated restaurants, attractions, and accommodations along your route."
    },
    {
      icon: Shield,
      title: "Safe Travel",
      description: "Real-time safety alerts and road condition updates to keep you informed."
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description: "Smart scheduling that maximizes your time at each destination."
    },
    {
      icon: Camera,
      title: "Photo Spots",
      description: "Find the most Instagram-worthy locations and scenic viewpoints."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for the Perfect Trip
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From route planning to local recommendations, we've got every aspect of your journey covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group hover:bg-gray-50 rounded-2xl p-6 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
