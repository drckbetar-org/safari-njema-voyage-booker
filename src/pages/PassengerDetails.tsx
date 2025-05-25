
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PassengerDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    idNumber: '',
    paymentMethod: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tripId = searchParams.get('tripId') || '';
  const fromCity = searchParams.get('from') || '';
  const toCity = searchParams.get('to') || '';
  const travelDate = searchParams.get('date') || '';
  const company = searchParams.get('company') || '';
  const departureTime = searchParams.get('time') || '';
  const pricePerSeat = parseInt(searchParams.get('price') || '0');
  const selectedSeats = searchParams.get('seats')?.split(',').map(Number) || [];

  const totalAmount = selectedSeats.length * pricePerSeat;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full name should only contain letters and spaces';
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(\+254|0)[1-9]\d{8}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid Kenyan phone number';
    }

    // Email validation (optional but if provided, must be valid)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // ID Number validation
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    } else if (!/^\d{7,8}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'ID number should be 7-8 digits';
    }

    // Payment Method validation
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate booking reference
      const bookingRef = `SN${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

      // Navigate to confirmation page
      const params = new URLSearchParams({
        bookingRef,
        from: fromCity,
        to: toCity,
        date: travelDate,
        company,
        time: departureTime,
        seats: selectedSeats.join(','),
        passenger: formData.fullName,
        phone: formData.phoneNumber,
        totalAmount: totalAmount.toString()
      });
      
      navigate(`/booking-confirmation?${params.toString()}`);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Passenger Details</h1>
          <p className="text-gray-600 mb-8">{fromCity} to {toCity}</p>
          <p className="text-lg text-gray-700 mb-8">Complete your booking details</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Passenger Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Passenger Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-gray-700">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`mt-1 border-sky-200 focus:border-sky-400 ${errors.fullName ? 'border-red-500' : ''}`}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="e.g. +254712345678"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className={`mt-1 border-sky-200 focus:border-sky-400 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email Address (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`mt-1 border-sky-200 focus:border-sky-400 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="idNumber" className="text-gray-700">ID Number *</Label>
                      <Input
                        id="idNumber"
                        placeholder="Enter your ID number"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        className={`mt-1 border-sky-200 focus:border-sky-400 ${errors.idNumber ? 'border-red-500' : ''}`}
                      />
                      {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
                    </div>

                    <div>
                      <Label htmlFor="paymentMethod" className="text-gray-700">Payment Method *</Label>
                      <Select onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                        <SelectTrigger className={`mt-1 border-sky-200 focus:border-sky-400 ${errors.paymentMethod ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="mpesa">M-Pesa Mobile Money</SelectItem>
                          <SelectItem value="airtel">Airtel Money</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trip Summary */}
            <div>
              <Card className="bg-white/90 backdrop-blur-sm border-sky-200 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-800">{company}</h4>
                      <p className="text-gray-600">{fromCity} → {toCity}</p>
                      <p className="text-gray-600">{departureTime}</p>
                      <p className="text-gray-600">Seats: {selectedSeats.join(', ')}</p>
                    </div>
                  </div>

                  <div className="bg-sky-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Price Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per seat:</span>
                        <span className="font-semibold text-black">KSh {pricePerSeat.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Number of seats:</span>
                        <span className="font-semibold">{selectedSeats.length}</span>
                      </div>
                      <hr className="border-sky-200" />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-gray-800">Total Amount:</span>
                        <span className="font-bold text-black">KSh {totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3"
                  >
                    {isSubmitting ? 'Processing...' : `Pay KSh ${totalAmount.toLocaleString()}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
