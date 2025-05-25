
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Phone, Star } from "lucide-react";

const Index = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const navigate = useNavigate();

  const cities = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale",
    "Garissa", "Kakamega", "Kericho", "Nyeri", "Machakos", "Meru", "Embu"
  ];

  const handleSearch = () => {
    if (fromCity && toCity && travelDate) {
      navigate(`/trips?from=${fromCity}&to=${toCity}&date=${travelDate}`);
    }
  };

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
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sky-600 bg-sky-50 px-3 py-1 rounded-lg">
                <Phone className="w-4 h-4" />
                <span className="font-medium">0783640875</span>
              </div>
              <a href="/about" className="text-gray-600 hover:text-sky-600">About Us</a>
              <a href="#" className="text-gray-600 hover:text-sky-600">24/7 Customer Support - Call us anytime for booking assistance, travel updates, or emergency support during your journey</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Journey to<br />
            <span className="text-sky-500">Adventure Begins</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the beauty of Kenya with Safari Njema - your trusted travel companion. 
            Safe, comfortable, and reliable transportation across the country.
          </p>

          {/* Booking Form */}
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border-sky-200 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Journey</h3>
              <p className="text-gray-600 mb-6">Find and book your perfect trip</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    From
                  </label>
                  <Select onValueChange={setFromCity}>
                    <SelectTrigger className="border-sky-200 focus:border-sky-400">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    To
                  </label>
                  <Select onValueChange={setToCity}>
                    <SelectTrigger className="border-sky-200 focus:border-sky-400">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {cities.filter(city => city !== fromCity).map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Date
                  </label>
                  <Input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="border-sky-200 focus:border-sky-400"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3"
                    disabled={!fromCity || !toCity || !travelDate}
                  >
                    Search Trips
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">47</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">200+</div>
              <div className="text-gray-600">Daily Trips</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Safari Njema?</h3>
          <p className="text-center text-gray-600 mb-12">We're committed to providing exceptional travel experiences with unmatched service quality</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">24/7 Service</h4>
                <p className="text-gray-600 text-sm">Round-the-clock support and service availability. Whether it's early morning or late night, we're here for you.</p>
                <p className="text-sky-600 font-medium mt-2">🕒 Always Available</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Great Customer Care</h4>
                <p className="text-gray-600 text-sm">Our dedicated support team ensures your travel experience is smooth from booking to destination arrival.</p>
                <p className="text-sky-600 font-medium mt-2">📞 Instant Support</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Customer Praises</h4>
                <p className="text-gray-600 text-sm">Join thousands of satisfied travelers who trust Safari Njema for their journey needs. Experience excellence in every trip.</p>
                <p className="text-sky-600 font-medium mt-2">⭐ 4.9/5 Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Stats */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-800 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-800 mb-2">200+</div>
              <div className="text-gray-600">Daily Routes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-800 mb-2">10+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-600 mb-8">Book your trip today and experience the difference with Safari Njema</p>
          <div className="space-x-4">
            <Button 
              onClick={() => document.querySelector('.booking-form')?.scrollIntoView()}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3"
            >
              Book Now
            </Button>
            <Button variant="outline" className="border-sky-200 text-sky-600 hover:bg-sky-50 px-8 py-3">
              Learn More
            </Button>
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

export default Index;
