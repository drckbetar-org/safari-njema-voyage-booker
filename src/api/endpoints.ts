
// API Endpoints for Safari Njema Backend Integration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// City and Route Endpoints
export const CITIES_ENDPOINT = `${API_BASE_URL}/cities`;
export const ROUTES_ENDPOINT = `${API_BASE_URL}/routes`;

// Trip Search and Booking Endpoints
export const SEARCH_TRIPS_ENDPOINT = `${API_BASE_URL}/trips/search`;
export const TRIP_DETAILS_ENDPOINT = `${API_BASE_URL}/trips`;

// Seat Management Endpoints
export const SEAT_STATUS_ENDPOINT = `${API_BASE_URL}/seats/status`;
export const RESERVE_SEATS_ENDPOINT = `${API_BASE_URL}/seats/reserve`;
export const RELEASE_SEATS_ENDPOINT = `${API_BASE_URL}/seats/release`;

// Booking Endpoints
export const CREATE_BOOKING_ENDPOINT = `${API_BASE_URL}/bookings`;
export const BOOKING_DETAILS_ENDPOINT = `${API_BASE_URL}/bookings`;
export const CONFIRM_BOOKING_ENDPOINT = `${API_BASE_URL}/bookings/confirm`;

// Payment Endpoints
export const INITIATE_PAYMENT_ENDPOINT = `${API_BASE_URL}/payments/initiate`;
export const PAYMENT_STATUS_ENDPOINT = `${API_BASE_URL}/payments/status`;
export const PAYMENT_CALLBACK_ENDPOINT = `${API_BASE_URL}/payments/callback`;

// Customer Endpoints
export const CUSTOMER_ENDPOINT = `${API_BASE_URL}/customers`;
export const CUSTOMER_BOOKINGS_ENDPOINT = `${API_BASE_URL}/customers/bookings`;

// Notification Endpoints
export const SEND_SMS_ENDPOINT = `${API_BASE_URL}/notifications/sms`;
export const SEND_EMAIL_ENDPOINT = `${API_BASE_URL}/notifications/email`;

// API Service Functions
export class SafariNjemaAPI {
  // City and Route Methods
  static async getCities() {
    const response = await fetch(CITIES_ENDPOINT);
    return response.json();
  }

  static async getRoutes(fromCity: string, toCity: string) {
    const response = await fetch(`${ROUTES_ENDPOINT}?from=${fromCity}&to=${toCity}`);
    return response.json();
  }

  // Trip Search Methods
  static async searchTrips(fromCity: string, toCity: string, date: string) {
    const response = await fetch(`${SEARCH_TRIPS_ENDPOINT}?from=${fromCity}&to=${toCity}&date=${date}`);
    return response.json();
  }

  static async getTripDetails(tripId: string) {
    const response = await fetch(`${TRIP_DETAILS_ENDPOINT}/${tripId}`);
    return response.json();
  }

  // Seat Management Methods
  static async getSeatStatus(tripId: string) {
    const response = await fetch(`${SEAT_STATUS_ENDPOINT}/${tripId}`);
    return response.json();
  }

  static async reserveSeats(tripId: string, seatNumbers: number[], customerInfo: any) {
    const response = await fetch(RESERVE_SEATS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId,
        seatNumbers,
        customerInfo,
      }),
    });
    return response.json();
  }

  static async releaseSeats(tripId: string, seatNumbers: number[]) {
    const response = await fetch(RELEASE_SEATS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tripId,
        seatNumbers,
      }),
    });
    return response.json();
  }

  // Booking Methods
  static async createBooking(bookingData: any) {
    const response = await fetch(CREATE_BOOKING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    return response.json();
  }

  static async getBookingDetails(bookingId: string) {
    const response = await fetch(`${BOOKING_DETAILS_ENDPOINT}/${bookingId}`);
    return response.json();
  }

  static async confirmBooking(bookingId: string, paymentId: string) {
    const response = await fetch(`${CONFIRM_BOOKING_ENDPOINT}/${bookingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId }),
    });
    return response.json();
  }

  // Payment Methods
  static async initiatePayment(bookingId: string, amount: number, phoneNumber: string, paymentMethod: string) {
    const response = await fetch(INITIATE_PAYMENT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId,
        amount,
        phoneNumber,
        paymentMethod,
      }),
    });
    return response.json();
  }

  static async getPaymentStatus(paymentId: string) {
    const response = await fetch(`${PAYMENT_STATUS_ENDPOINT}/${paymentId}`);
    return response.json();
  }

  // Customer Methods
  static async createCustomer(customerData: any) {
    const response = await fetch(CUSTOMER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    return response.json();
  }

  static async getCustomerBookings(customerId: string) {
    const response = await fetch(`${CUSTOMER_BOOKINGS_ENDPOINT}/${customerId}`);
    return response.json();
  }

  // Notification Methods
  static async sendSMS(phoneNumber: string, message: string) {
    const response = await fetch(SEND_SMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message,
      }),
    });
    return response.json();
  }

  static async sendEmail(email: string, subject: string, content: string) {
    const response = await fetch(SEND_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject,
        content,
      }),
    });
    return response.json();
  }
}

// API Response Types
export interface City {
  id: string;
  name: string;
  region: string;
}

export interface Route {
  id: string;
  fromCity: string;
  toCity: string;
  distance: number;
  estimatedDuration: string;
}

export interface Trip {
  id: string;
  routeId: string;
  company: string;
  vehicleType: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  features: string[];
}

export interface SeatStatus {
  tripId: string;
  seatNumber: number;
  status: 'available' | 'reserved' | 'booked';
  reservedUntil?: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  tripId: string;
  customerId: string;
  seatNumbers: number[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  idNumber: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: string;
}
