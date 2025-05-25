
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface SeatStatus {
  [key: number]: 'available' | 'selected' | 'booked';
}

const SeatSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [seatStatus, setSeatStatus] = useState<SeatStatus>({});
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const tripId = searchParams.get('tripId') || '';
  const fromCity = searchParams.get('from') || '';
  const toCity = searchParams.get('to') || '';
  const travelDate = searchParams.get('date') || '';
  const company = searchParams.get('company') || '';
  const departureTime = searchParams.get('time') || '';
  const pricePerSeat = parseInt(searchParams.get('price') || '0');

  useEffect(() => {
    // Initialize seat status - some seats already booked
    const initialStatus: SeatStatus = {};
    const bookedSeats = [2, 5, 8, 12, 15, 18, 22, 27]; // Mock booked seats
    
    for (let i = 1; i <= 30; i++) {
      initialStatus[i] = bookedSeats.includes(i) ? 'booked' : 'available';
    }
    
    setSeatStatus(initialStatus);
  }, []);

  const handleSeatClick = (seatNumber: number) => {
    if (seatStatus[seatNumber] === 'booked') return;

    const newStatus = { ...seatStatus };
    const newSelectedSeats = [...selectedSeats];

    if (seatStatus[seatNumber] === 'selected') {
      newStatus[seatNumber] = 'available';
      const index = newSelectedSeats.indexOf(seatNumber);
      newSelectedSeats.splice(index, 1);
    } else {
      newStatus[seatNumber] = 'selected';
      newSelectedSeats.push(seatNumber);
    }

    setSeatStatus(newStatus);
    setSelectedSeats(newSelectedSeats);
  };

  const getSeatColor = (seatNumber: number) => {
    const status = seatStatus[seatNumber];
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'selected':
        return 'bg-sky-500 text-white';
      case 'booked':
        return 'bg-gray-400 text-gray-600 cursor-not-allowed';
      default:
        return 'bg-green-500 hover:bg-green-600 text-white';
    }
  };

  const totalAmount = selectedSeats.length * pricePerSeat;

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      const params = new URLSearchParams({
        tripId,
        from: fromCity,
        to: toCity,
        date: travelDate,
        company,
        time: departureTime,
        price: pricePerSeat.toString(),
        seats: selectedSeats.join(',')
      });
      navigate(`/passenger-details?${params.toString()}`);
    }
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
                onClick={() => navigate(-1)}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Select Your Seats - {company}
                </h2>
                <p className="text-gray-600 mb-6">
                  {fromCity} to {toCity} • {departureTime}
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Seats</h3>
                
                {/* Driver indicator */}
                <div className="mb-6">
                  <div className="w-16 h-8 bg-gray-300 rounded flex items-center justify-center mx-auto">
                    <span className="text-xs font-medium">Driver</span>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-6">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((seatNumber) => (
                    <Button
                      key={seatNumber}
                      onClick={() => handleSeatClick(seatNumber)}
                      className={`w-12 h-12 text-sm font-semibold transition-colors ${getSeatColor(seatNumber)}`}
                      disabled={seatStatus[seatNumber] === 'booked'}
                    >
                      {seatNumber}
                    </Button>
                  ))}
                </div>

                {/* Seat Legend */}
                <div className="bg-sky-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Seat Legend</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-sky-500 rounded mr-2"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                      <span>Booked</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Summary */}
          <div>
            <Card className="bg-white/90 backdrop-blur-sm border-sky-200 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per seat:</span>
                    <span className="font-semibold text-black">KSh {pricePerSeat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected seats:</span>
                    <span className="font-semibold">{selectedSeats.length}</span>
                  </div>
                  {selectedSeats.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Seats: {selectedSeats.sort((a, b) => a - b).join(', ')}
                    </div>
                  )}
                  <hr className="border-sky-200" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-800">Total:</span>
                    <span className="font-bold text-black">KSh {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {selectedSeats.length > 0 ? (
                  <Button 
                    onClick={handleContinue}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium"
                  >
                    Continue to Passenger Details
                  </Button>
                ) : (
                  <Button 
                    disabled
                    className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Select Seats to Continue
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  className="w-full mt-3 border-sky-200 text-sky-600 hover:bg-sky-50"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
