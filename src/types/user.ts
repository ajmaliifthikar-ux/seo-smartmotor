export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  loyaltyPoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  licensePlate?: string;
  lastServiceMileage?: number;
  createdAt: Date;
  updatedAt: Date;
}