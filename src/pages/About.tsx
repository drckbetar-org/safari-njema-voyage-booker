
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Star, Users, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Safari Njema</h1>
                <p className="text-xs text-sky-600">Your Journey Begins Here</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-sky-200 text-sky-600 hover:bg-sky-50"
              >
                Home
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* About Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-sky-500">Safari Njema</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Since 2014, Safari Njema has been Kenya's most trusted travel companion, 
            connecting communities and making journeys across the country safe, comfortable, and reliable.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Story</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Safari Njema was founded with a simple vision: to provide every Kenyan with access to safe, 
              reliable, and affordable transportation. What started as a small fleet of buses has grown into 
              one of Kenya's most respected transport companies, serving over 47 cities and towns across the country.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our name "Safari Njema" means "Good Journey" in Swahili, and that's exactly what we promise 
              every passenger. We believe that travel should be more than just getting from point A to point B - 
              it should be an experience that connects people, cultures, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Safety First</h4>
                <p className="text-gray-600 text-sm">
                  Every vehicle undergoes rigorous safety checks and our drivers are professionally trained 
                  to ensure your journey is secure.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Customer First</h4>
                <p className="text-gray-600 text-sm">
                  Our passengers are at the heart of everything we do. We listen, adapt, and continuously 
                  improve to serve you better.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Reliability</h4>
                <p className="text-gray-600 text-sm">
                  We honor our commitments. When we say we'll be there, we will be. Your time matters to us 
                  as much as it does to you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">24/7 Customer Support</h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our dedicated customer support team is available round the clock to assist you with bookings, 
            travel updates, emergency support during your journey, route information, and any other travel-related queries.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/70 backdrop-blur-sm border-sky-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Call Us</h4>
                <p className="text-sky-600 font-bold text-lg">0783640875</p>
                <p className="text-gray-600 text-sm mt-2">Available 24/7 for all your travel needs</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-sky-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Email Support</h4>
                <p className="text-sky-600 font-medium">support@safarinjema.co.ke</p>
                <p className="text-gray-600 text-sm mt-2">Get detailed assistance via email</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-sky-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Visit Us</h4>
                <p className="text-gray-600 text-sm">Main Office: Nairobi CBD</p>
                <p className="text-gray-600 text-sm mt-2">Multiple booking offices nationwide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">10+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">47</div>
              <div className="text-gray-600">Cities Connected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">4.9★</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Safari Njema. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Your trusted travel partner across Kenya</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
