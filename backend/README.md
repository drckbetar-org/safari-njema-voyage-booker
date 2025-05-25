
# Safari Njema Backend API

This is the backend API for the Safari Njema travel booking system.

## Features

- Trip search and booking
- Seat management and reservations
- Customer management
- Payment processing (simulation)
- SMS and email notifications (simulation)
- Real-time seat availability

## API Endpoints

### Cities and Routes
- `GET /api/cities` - Get all available cities
- `GET /api/routes` - Get routes between cities

### Trip Management
- `GET /api/trips/search` - Search for trips
- `GET /api/trips/:tripId` - Get trip details

### Seat Management
- `GET /api/seats/status/:tripId` - Get seat availability
- `POST /api/seats/reserve` - Reserve seats temporarily
- `POST /api/seats/release` - Release reserved seats

### Customer Management
- `POST /api/customers` - Create/update customer
- `GET /api/customers/:customerId` - Get customer details

### Booking Management
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:bookingId` - Get booking details
- `POST /api/bookings/:bookingId/confirm` - Confirm booking

### Payment Processing
- `POST /api/payments/initiate` - Initiate payment
- `GET /api/payments/:paymentId/status` - Check payment status

### Notifications
- `POST /api/notifications/sms` - Send SMS notification
- `POST /api/notifications/email` - Send email notification

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

The server will run on port 3001 by default.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=3001
NODE_ENV=development
API_BASE_URL=http://localhost:3001

# SMS API Configuration (when integrating real SMS service)
SMS_API_KEY=your_sms_api_key
SMS_API_URL=your_sms_api_url

# Email Configuration (when integrating real email service)
EMAIL_API_KEY=your_email_api_key
EMAIL_FROM=noreply@safarinjema.com

# Payment Gateway Configuration (when integrating real payment)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_mpesa_shortcode
```

## Data Models

### Trip
```javascript
{
  id: string,
  routeId: string,
  company: string,
  vehicleType: string,
  service: string,
  departureTime: string,
  arrivalTime: string,
  price: number,
  availableSeats: number,
  totalSeats: number,
  features: string[],
  fromCity: string,
  toCity: string
}
```

### Booking
```javascript
{
  id: string,
  bookingReference: string,
  tripId: string,
  customerId: string,
  seatNumbers: number[],
  totalAmount: number,
  status: 'pending' | 'confirmed' | 'cancelled',
  paymentStatus: 'pending' | 'completed' | 'failed',
  paymentMethod: string,
  createdAt: string
}
```

### Customer
```javascript
{
  id: string,
  fullName: string,
  phoneNumber: string,
  email?: string,
  idNumber: string,
  createdAt: string
}
```

## Testing

You can test the API using the health check endpoint:

```bash
curl http://localhost:3001/api/health
```

## Deployment

For production deployment, consider:

1. Using a proper database (PostgreSQL, MongoDB)
2. Implementing real payment gateways (M-Pesa, Stripe)
3. Adding authentication and authorization
4. Implementing proper logging
5. Adding rate limiting
6. Using environment-specific configurations
7. Setting up monitoring and error tracking

## License

MIT License
