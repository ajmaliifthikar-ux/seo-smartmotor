import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session'; // Assuming getAdminSession can be adapted or a new getUserSession will be created
import { cookies } from 'next/headers';
import admin from 'firebase-admin';

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionCookie = (await cookies()).get('session')?.value || '';
  if (!sessionCookie) {
    redirect('/auth?error=UNAUTHORIZED');
  }

  try {
    // Verify the session cookie. This will throw an error if the cookie is invalid or expired.
    await admin.auth().verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.error('UserDashboardLayout Session Error:', error);
    redirect('/auth?error=SESSION_ERROR');
  }

  // In a real application, you might fetch user-specific data here
  // and pass it down via context or directly to children components.

  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="p-4 md:p-8 min-h-screen relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
