import { Metadata } from 'next';
import { UserProfile } from '@/types/user';
import { getUserProfile } from '@/lib/firestore-utils';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';
import { notFound } from 'next/navigation';
import { MyBookings } from '@/components/user/my-bookings';
import { MyVehicles } from '@/components/user/my-vehicles';
import { MyProfile } from '@/components/user/my-profile';
import { MyLoyalty } from '@/components/user/my-loyalty';

export const metadata: Metadata = {
  title: 'My Dashboard | Smart Motor',
  description: 'Manage your bookings, vehicles, profile, and loyalty points.',
};

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export default async function UserDashboardPage() {
  const sessionCookie = (await cookies()).get('user-token')?.value || '';
  if (!sessionCookie) {
    // This should ideally be caught by layout.tsx, but good for redundancy
    notFound();
  }

  let userProfile: UserProfile | null = null;
  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    userProfile = await getUserProfile(decodedClaims.uid);
  } catch (error) {
    console.error('Error fetching user profile for dashboard:', error);
    notFound();
  }

  if (!userProfile) {
    notFound();
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div>
        <p className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-2">
          Concierge Portal
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter uppercase italic leading-none">
          Welcome back, <span className="silver-shine">{(userProfile.fullName || 'User').split(' ')[0]}</span>
        </h1>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <MyBookings />
          <MyVehicles />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <MyLoyalty />
          <MyProfile />
        </div>
      </div>
    </div>
  );
}
