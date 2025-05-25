
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock Data
let cities = [
  { id: '1', name: 'Nairobi', region: 'Central' },
  { id: '2', name: 'Mombasa', region: 'Coast' },
  { id: '3', name: 'Kisumu', region: 'Nyanza' },
  { id: '4', name: 'Nakuru', region: 'Rift Valley' },
  { id: '5', name: 'Eldoret', region: 'Rift Valley' },
  { id: '6', name: 'Thika', region: 'Central' },
  { id: '7', name: 'Malindi', region: 'Coast' },
  { id: '8', name: 'Kitale', region: 'Rift Valley' },
  { id: '9', name: 'Garissa', region: 'North Eastern' },
  { id: '10', name: 'Kakamega', region: 'Western' },
  { id: '11', name: 'Kericho', region: 'Rift Valley' },
  { id: '12', name: 'Nyeri', region: 'Central' },
  { id: '13', name: 'Machakos', region: 'Eastern' },
  { id: '14', name: 'Meru', region: 'Eastern' },
  { id: '15', name: 'Embu', region: 'Eastern' }
];

let trips = [
  {
    id: '1',
    routeId: '1',
    company: 'Safari Express',
    vehicleType: 'Bus',
    service: 'Express Service',
    departureTime: '08:00 AM',
    arrivalTime: '06:00 PM',
    price: 1500,
    availableSeats: 12,
    totalSeats: 30,
    features: ['Economy Class', 'Air Conditioned'],
    fromCity: 'Nairobi',
    toCity: 'Mombasa'
  },
  {
    id: '2',
    routeId: '1',
    company: 'Njema Bus',
    vehicleType: 'Bus',
    service: 'Express Service',
    departureTime: '10:30 AM',
    arrivalTime: '08:30 PM',
    price: 1200,
    availableSeats: 8,
    totalSeats: 30,
    features: ['Economy Class', 'Air Conditioned'],
    fromCity: 'Nairobi',
    toCity: 'Mombasa'
  },
  {
    id: '3',
    routeId: '1',
    company: 'Coast Shuttle',
    vehicleType: 'Shuttle',
    service: 'Express Service',
    departureTime: '02:00 PM',
    arrivalTime: '12:00 AM',
    price: 1800,
    availableSeats: 15,
    totalSeats: 24,
    features: ['Economy Class', 'Air Conditioned'],
    fromCity: 'Nairobi',
    toCity: 'Mombasa'
  }
];

let bookings = [];
let customers = [];
let payments = [];
let seatReservations = {}; // tripId: { seatNumber: status }

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to generate booking reference
const generateBookingRef = () => `SN${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

// Routes

// Cities Endpoints
app.get('/api/cities', (req, res) => {
  res.json({ success: true, data: cities });
});

// Trip Search Endpoints
app.get('/api/trips/search', (req, res) => {
  const { from, to, date } = req.query;
  
  if (!from || !to || !date) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required parameters: from, to, date' 
    });
  }

  // Filter trips based on route
  const filteredTrips = trips.filter(trip => 
    trip.fromCity.toLowerCase() === from.toLowerCase() && 
    trip.toCity.toLowerCase() === to.toLowerCase()
  );

  res.json({ 
    success: true, 
    data: filteredTrips,
    searchParams: { from, to, date }
  });
});

app.get('/api/trips/:tripId', (req, res) => {
  const { tripId } = req.params;
  const trip = trips.find(t => t.id === tripId);
  
  if (!trip) {
    return res.status(404).json({ 
      success: false, 
      message: 'Trip not found' 
    });
  }

  res.json({ success: true, data: trip });
});

// Seat Management Endpoints
app.get('/api/seats/status/:tripId', (req, res) => {
  const { tripId } = req.params;
  const trip = trips.find(t => t.id === tripId);
  
  if (!trip) {
    return res.status(404).json({ 
      success: false, 
      message: 'Trip not found' 
    });
  }

  // Initialize seat status if not exists
  if (!seatReservations[tripId]) {
    seatReservations[tripId] = {};
    // Mock some pre-booked seats
    const bookedSeats = [2, 5, 8, 12, 15, 18, 22, 27];
    bookedSeats.forEach(seat => {
      seatReservations[tripId][seat] = 'booked';
    });
  }

  const seatStatus = [];
  for (let i = 1; i <= trip.totalSeats; i++) {
    seatStatus.push({
      seatNumber: i,
      status: seatReservations[tripId][i] || 'available'
    });
  }

  res.json({ success: true, data: seatStatus });
});

app.post('/api/seats/reserve', (req, res) => {
  const { tripId, seatNumbers, customerInfo } = req.body;
  
  if (!tripId || !seatNumbers || !Array.isArray(seatNumbers)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid request data' 
    });
  }

  // Initialize if not exists
  if (!seatReservations[tripId]) {
    seatReservations[tripId] = {};
  }

  // Check if seats are available
  const unavailableSeats = seatNumbers.filter(seat => 
    seatReservations[tripId][seat] && seatReservations[tripId][seat] !== 'available'
  );

  if (unavailableSeats.length > 0) {
    return res.status(400).json({ 
      success: false, 
      message: `Seats ${unavailableSeats.join(', ')} are not available` 
    });
  }

  // Reserve seats
  seatNumbers.forEach(seat => {
    seatReservations[tripId][seat] = 'reserved';
  });

  // Set timeout to release seats after 10 minutes if not confirmed
  setTimeout(() => {
    seatNumbers.forEach(seat => {
      if (seatReservations[tripId][seat] === 'reserved') {
        seatReservations[tripId][seat] = 'available';
      }
    });
  }, 10 * 60 * 1000); // 10 minutes

  res.json({ 
    success: true, 
    message: 'Seats reserved successfully',
    reservedUntil: new Date(Date.now() + 10 * 60 * 1000).toISOString()
  });
});

app.post('/api/seats/release', (req, res) => {
  const { tripId, seatNumbers } = req.body;
  
  if (!seatReservations[tripId]) {
    return res.status(404).json({ 
      success: false, 
      message: 'Trip not found' 
    });
  }

  seatNumbers.forEach(seat => {
    if (seatReservations[tripId][seat] === 'reserved') {
      seatReservations[tripId][seat] = 'available';
    }
  });

  res.json({ success: true, message: 'Seats released successfully' });
});

// Customer Endpoints
app.post('/api/customers', (req, res) => {
  const { fullName, phoneNumber, email, idNumber } = req.body;
  
  if (!fullName || !phoneNumber || !idNumber) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required customer information' 
    });
  }

  // Check if customer already exists
  let customer = customers.find(c => c.phoneNumber === phoneNumber || c.idNumber === idNumber);
  
  if (!customer) {
    customer = {
      id: generateId(),
      fullName,
      phoneNumber,
      email: email || null,
      idNumber,
      createdAt: new Date().toISOString()
    };
    customers.push(customer);
  }

  res.json({ success: true, data: customer });
});

app.get('/api/customers/:customerId', (req, res) => {
  const { customerId } = req.params;
  const customer = customers.find(c => c.id === customerId);
  
  if (!customer) {
    return res.status(404).json({ 
      success: false, 
      message: 'Customer not found' 
    });
  }

  res.json({ success: true, data: customer });
});

// Booking Endpoints
app.post('/api/bookings', (req, res) => {
  const { 
    tripId, 
    customerId, 
    customerInfo,
    seatNumbers, 
    totalAmount,
    paymentMethod 
  } = req.body;
  
  if (!tripId || !seatNumbers || !Array.isArray(seatNumbers) || !totalAmount) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required booking information' 
    });
  }

  // Create or get customer
  let customer;
  if (customerId) {
    customer = customers.find(c => c.id === customerId);
  } else if (customerInfo) {
    customer = {
      id: generateId(),
      ...customerInfo,
      createdAt: new Date().toISOString()
    };
    customers.push(customer);
  }

  if (!customer) {
    return res.status(400).json({ 
      success: false, 
      message: 'Customer information required' 
    });
  }

  // Create booking
  const booking = {
    id: generateId(),
    bookingReference: generateBookingRef(),
    tripId,
    customerId: customer.id,
    seatNumbers,
    totalAmount,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: paymentMethod || 'mpesa',
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  // Mark seats as booked
  if (!seatReservations[tripId]) {
    seatReservations[tripId] = {};
  }
  seatNumbers.forEach(seat => {
    seatReservations[tripId][seat] = 'booked';
  });

  res.json({ 
    success: true, 
    data: booking,
    customer: customer
  });
});

app.get('/api/bookings/:bookingId', (req, res) => {
  const { bookingId } = req.params;
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return res.status(404).json({ 
      success: false, 
      message: 'Booking not found' 
    });
  }

  const customer = customers.find(c => c.id === booking.customerId);
  const trip = trips.find(t => t.id === booking.tripId);

  res.json({ 
    success: true, 
    data: {
      ...booking,
      customer,
      trip
    }
  });
});

app.post('/api/bookings/:bookingId/confirm', (req, res) => {
  const { bookingId } = req.params;
  const { paymentId } = req.body;
  
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ 
      success: false, 
      message: 'Booking not found' 
    });
  }

  booking.status = 'confirmed';
  booking.paymentStatus = 'completed';
  booking.paymentId = paymentId;
  booking.confirmedAt = new Date().toISOString();

  res.json({ 
    success: true, 
    data: booking,
    message: 'Booking confirmed successfully'
  });
});

// Payment Endpoints
app.post('/api/payments/initiate', (req, res) => {
  const { bookingId, amount, phoneNumber, paymentMethod } = req.body;
  
  if (!bookingId || !amount || !phoneNumber) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required payment information' 
    });
  }

  const payment = {
    id: generateId(),
    bookingId,
    amount,
    phoneNumber,
    method: paymentMethod || 'mpesa',
    status: 'pending',
    transactionId: `TXN${generateId().toUpperCase()}`,
    createdAt: new Date().toISOString()
  };

  payments.push(payment);

  // Simulate payment processing
  setTimeout(() => {
    payment.status = 'completed';
    payment.completedAt = new Date().toISOString();
    
    // Update booking
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
    }
  }, 2000);

  res.json({ 
    success: true, 
    data: payment,
    message: 'Payment initiated successfully'
  });
});

app.get('/api/payments/:paymentId/status', (req, res) => {
  const { paymentId } = req.params;
  const payment = payments.find(p => p.id === paymentId);
  
  if (!payment) {
    return res.status(404).json({ 
      success: false, 
      message: 'Payment not found' 
    });
  }

  res.json({ success: true, data: payment });
});

// Notification Endpoints
app.post('/api/notifications/sms', (req, res) => {
  const { phoneNumber, message } = req.body;
  
  if (!phoneNumber || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Phone number and message are required' 
    });
  }

  // Simulate SMS sending
  console.log(`Sending SMS to ${phoneNumber}: ${message}`);
  
  res.json({ 
    success: true, 
    message: 'SMS sent successfully',
    data: {
      phoneNumber,
      message,
      sentAt: new Date().toISOString()
    }
  });
});

app.post('/api/notifications/email', (req, res) => {
  const { email, subject, content } = req.body;
  
  if (!email || !subject || !content) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email, subject and content are required' 
    });
  }

  // Simulate email sending
  console.log(`Sending email to ${email}: ${subject}`);
  
  res.json({ 
    success: true, 
    message: 'Email sent successfully',
    data: {
      email,
      subject,
      content,
      sentAt: new Date().toISOString()
    }
  });
});

// Routes endpoint
app.get('/api/routes', (req, res) => {
  const { from, to } = req.query;
  
  const routes = [
    {
      id: '1',
      fromCity: from || 'Nairobi',
      toCity: to || 'Mombasa',
      distance: 480,
      estimatedDuration: '8-10 hours'
    }
  ];

  res.json({ success: true, data: routes });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Safari Njema API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Safari Njema API server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
