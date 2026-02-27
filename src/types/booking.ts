export interface Booking {
    id: string;
    bookingRef: string;
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    brand: string;
    model: string;
    year: string;
    services: string[];
    date: string; // ISO date string
    time: string;
    notes?: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    vehicle: string; // Derived from brand, model, year
  }