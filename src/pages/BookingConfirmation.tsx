
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Printer } from "lucide-react";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingRef = searchParams.get('bookingRef') || '';
  const fromCity = searchParams.get('from') || '';
  const toCity = searchParams.get('to') || '';
  const travelDate = searchParams.get('date') || '';
  const company = searchParams.get('company') || '';
  const departureTime = searchParams.get('time') || '';
  const selectedSeats = searchParams.get('seats')?.split(',') || [];
  const passengerName = searchParams.get('passenger') || '';
  const phoneNumber = searchParams.get('phone') || '';
  const totalAmount = parseInt(searchParams.get('totalAmount') || '0');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky-200 sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/7129a01a-92cc-4e0c-a098-83acecc53ed8.png" 
                alt="Safari Njema Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold text-gray-800">Safari Njema</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="bg-white/90 backdrop-blur-sm border-sky-200 mb-8">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h1>
              <p className="text-gray-600 mb-4">Welcome to Safari Njema! 🎉</p>
              <p className="text-gray-600">
                Thank you for choosing Safari Njema for your journey. We're excited to serve you 
                and look forward to making your trip comfortable and memorable!
              </p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Booking Reference */}
                <div className="text-center bg-sky-50 p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-600 mb-1">Booking Reference</h2>
                  <p className="text-2xl font-bold text-sky-600">{bookingRef}</p>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Trip Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span className="font-medium">{fromCity} → {toCity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{new Date(travelDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure Time:</span>
                        <span className="font-medium">{departureTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seat Numbers:</span>
                        <span className="font-medium">{selectedSeats.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Passenger Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{passengerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Paid:</span>
                    <span className="text-2xl font-bold text-black">KSh {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* SMS Confirmation */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    📱 A confirmation SMS has been sent to {phoneNumber}
                  </p>
                </div>

                {/* Footer Message */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600 mb-2">
                    We hope you have a safe and pleasant journey! Don't forget to book with Safari Njema for your future travels.
                  </p>
                  <p className="text-sky-600 font-medium">
                    #SafariNjema #YourJourneyMatters
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 print:hidden">
                  <Button 
                    onClick={() => navigate('/')}
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                  <Button 
                    onClick={handlePrint}
                    variant="outline"
                    className="flex-1 border-sky-200 text-sky-600 hover:bg-sky-50"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
