
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";

interface Trip {
  id: string;
  company: string;
  service: string;
  departureTime: string;
  availableSeats: number;
  price: number;
  features: string[];
}

const Trips = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const fromCity = searchParams.get('from') || '';
  const toCity = searchParams.get('to') || '';
  const travelDate = searchParams.get('date') || '';

  useEffect(() => {
    // Simulate API call to fetch trips
    const fetchTrips = async () => {
      setLoading(true);
      // Mock data - in real app, this would be an API call
      const mockTrips: Trip[] = [
        {
          id: "1",
          company: "Safari Express",
          service: "Express Service",
          departureTime: "08:00 AM",
          availableSeats: 12,
          price: 1500,
          features: ["Economy Class", "Air Conditioned"]
        },
        {
          id: "2",
          company: "Njema Bus",
          service: "Express Service",
          departureTime: "10:30 AM",
          availableSeats: 8,
          price: 1200,
          features: ["Economy Class", "Air Conditioned"]
        },
        {
          id: "3",
          company: "Coast Shuttle",
          service: "Express Service",
          departureTime: "02:00 PM",
          availableSeats: 15,
          price: 1800,
          features: ["Economy Class", "Air Conditioned"]
        }
      ];
      
      setTimeout(() => {
        setTrips(mockTrips);
        setLoading(false);
      }, 1000);
    };

    fetchTrips();
  }, [fromCity, toCity, travelDate]);

  const handleSelectTrip = (trip: Trip) => {
    navigate(`/seats?tripId=${trip.id}&from=${fromCity}&to=${toCity}&date=${travelDate}&company=${trip.company}&time=${trip.departureTime}&price=${trip.price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-sky-600"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SN</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Safari Njema</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-sky-200 text-sky-600 hover:bg-sky-50"
            >
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Route Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-sky-500" />
            {fromCity} to {toCity}
          </h1>
          <p className="text-gray-600">Select your preferred travel option</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/70 backdrop-blur-sm border-sky-200">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Trip Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {trips.map((trip) => (
                <Card key={trip.id} className="bg-white/90 backdrop-blur-sm border-sky-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{trip.company}</h3>
                        <Badge variant="secondary" className="bg-sky-100 text-sky-700 mt-1">
                          {trip.service}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="font-medium">{trip.departureTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{trip.availableSeats} seats available</span>
                      </div>
                      <div className="text-2xl font-bold text-black">
                        KSh {trip.price.toLocaleString()}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleSelectTrip(trip)}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium"
                      disabled={trip.availableSeats === 0}
                    >
                      {trip.availableSeats === 0 ? 'Fully Booked' : 'Select'}
                    </Button>

                    <div className="mt-4 space-y-1">
                      {trip.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="mr-2 border-sky-200 text-sky-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-sky-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">On-Time Departure</h4>
                  <p className="text-gray-600 text-sm">Reliable and punctual service</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-sky-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Comfortable Seating</h4>
                  <p className="text-gray-600 text-sm">Spacious and ergonomic seats</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-sky-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Best Prices</h4>
                  <p className="text-gray-600 text-sm">Competitive and transparent pricing</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Trips;
