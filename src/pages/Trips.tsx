
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
  availableSeatNumbers: number[];
  price: number;
  features: string[];
  vehicleType: 'bus' | 'matatu';
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
    const fetchTrips = async () => {
      setLoading(true);
      // Mock data with available seat numbers
      const mockTrips: Trip[] = [
        {
          id: "1",
          company: "Safari Express",
          service: "Express Service",
          departureTime: "08:00 AM",
          availableSeats: 12,
          availableSeatNumbers: [1, 3, 4, 6, 7, 9, 10, 11, 13, 14, 16, 17],
          price: 1500,
          features: ["Economy Class", "Air Conditioned"],
          vehicleType: 'bus'
        },
        {
          id: "2",
          company: "Njema Bus",
          service: "Express Service",
          departureTime: "10:30 AM",
          availableSeats: 8,
          availableSeatNumbers: [1, 3, 6, 9, 11, 13, 14, 16],
          price: 1200,
          features: ["Economy Class", "Air Conditioned"],
          vehicleType: 'bus'
        },
        {
          id: "3",
          company: "Coast Shuttle",
          service: "Matatu Service",
          departureTime: "02:00 PM",
          availableSeats: 10,
          availableSeatNumbers: [1, 2, 4, 5, 7, 8, 10, 11, 12, 13],
          price: 800,
          features: ["Economy Class", "Music System"],
          vehicleType: 'matatu'
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
    navigate(`/seats?tripId=${trip.id}&from=${fromCity}&to=${toCity}&date=${travelDate}&company=${trip.company}&time=${trip.departureTime}&price=${trip.price}&vehicleType=${trip.vehicleType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-cyan-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-cyan-600"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/68f90657-59a4-4e14-9abe-6814ba057dac.png" 
                  alt="Safari Njema" 
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Safari Njema</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            >
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Route Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-cyan-500" />
            {fromCity} to {toCity}
          </h1>
          <p className="text-gray-600">Select your preferred travel option</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm border-cyan-200">
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
                <Card key={trip.id} className="bg-white/90 backdrop-blur-sm border-cyan-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{trip.company}</h3>
                        <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 mt-1">
                          {trip.service}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 mt-1 ml-2">
                          {trip.vehicleType === 'bus' ? 'Bus' : 'Matatu'}
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
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Available seats: </span>
                        {trip.availableSeatNumbers.slice(0, 8).join(', ')}
                        {trip.availableSeatNumbers.length > 8 && '...'}
                      </div>
                      <div className="text-2xl font-bold text-black">
                        KSh {trip.price.toLocaleString()}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleSelectTrip(trip)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium"
                      disabled={trip.availableSeats === 0}
                    >
                      {trip.availableSeats === 0 ? 'Fully Booked' : 'Select'}
                    </Button>

                    <div className="mt-4 space-y-1">
                      {trip.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="mr-2 border-cyan-200 text-cyan-700">
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
              <Card className="bg-white/80 backdrop-blur-sm border-cyan-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">On-Time Departure</h4>
                  <p className="text-gray-600 text-sm">Reliable and punctual service</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-cyan-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Comfortable Seating</h4>
                  <p className="text-gray-600 text-sm">Spacious and ergonomic seats</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-cyan-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
