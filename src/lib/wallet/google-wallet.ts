import { GoogleAuth } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const ISSUER_ID = '3388000000023089613';
const CLASS_ID = `${ISSUER_ID}.SmartMotorBooking`;

// Load credentials from environment variables for Vercel support
const walletCredentials = {
  client_email: process.env.GOOGLE_WALLET_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  project_id: process.env.GOOGLE_WALLET_PROJECT_ID,
};

export async function createGoogleWalletPass(bookingDetails: {
  bookingRef: string;
  customerName: string;
  vehicle: string;
  date: string;
  time: string;
  services: string[];
}): Promise<string> {
  console.log('Starting Google Wallet Pass creation for:', bookingDetails.bookingRef);

  if (!walletCredentials.client_email || !walletCredentials.private_key) {
    console.error('Google Wallet credentials not configured in environment variables');
    throw new Error('Google Wallet integration is not configured');
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: walletCredentials.client_email,
      private_key: walletCredentials.private_key,
      project_id: walletCredentials.project_id,
    },
    scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
  });

  const client = await auth.getClient();

  // 1. Ensure the GenericClass exists
  try {
    const classUrl = `https://walletobjects.googleapis.com/walletobjects/v1/genericClass`;
    const simpleClassPayload = {
      id: CLASS_ID,
      issuerName: "Smart Motor Performance",
      reviewStatus: "UNDER_REVIEW",
      multipleDevicesAndHoldersAllowedStatus: "MULTIPLE_HOLDERS",
    };

    console.log('Attempting to create/verify Google Wallet Class:', CLASS_ID);
    
    // Cast the client to any to bypass TS error as request is available on the client
    await (client as any).request({
      url: classUrl,
      method: 'POST',
      data: simpleClassPayload,
    });
    console.log('Google Wallet Class created successfully');
  } catch (error: any) {
    if (error?.response?.status === 409) {
      console.log('Google Wallet Class already exists (409)');
    } else {
      console.error('Error creating Google Wallet Class:', {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error.message
      });
      // We continue because the class might already exist but we failed to verify it for other reasons
    }
  }

  // 2. Define the GenericObject representing the Pass
  const OBJECT_ID = `${ISSUER_ID}.${bookingDetails.bookingRef.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const newObject = {
    id: OBJECT_ID,
    classId: CLASS_ID,
    state: "ACTIVE",
    heroImage: {
      sourceUri: {
        uri: "https://smartmotorlatest.vercel.app/images/hero/store-front.webp"
      }
    },
    textModulesData: [
      {
        id: "vehicle",
        header: "Vehicle",
        body: bookingDetails.vehicle
      },
      {
        id: "datetime",
        header: "Appointment Time",
        body: `${bookingDetails.date} at ${bookingDetails.time}`
      },
      {
        id: "services",
        header: "Services",
        body: bookingDetails.services.join(', ')
      }
    ],
    barcode: {
      type: "QR_CODE",
      value: bookingDetails.bookingRef,
      alternateText: bookingDetails.bookingRef
    },
    headerText: {
      defaultValue: {
        language: "en-US",
        value: "Booking Confirmation"
      }
    },
    subheaderText: {
      defaultValue: {
        language: "en-US",
        value: bookingDetails.customerName
      }
    },
    hexBackgroundColor: "#121212"
  };

  // 3. Generate the JWT token
  const claims = {
    iss: walletCredentials.client_email,
    aud: 'google',
    origins: [], // Omitted for better compatibility
    typ: 'savetowallet',
    payload: {
      genericObjects: [newObject]
    }
  };

  console.log('Generating Google Wallet JWT for Object ID:', OBJECT_ID);

  const token = jwt.sign(claims, walletCredentials.private_key, { algorithm: 'RS256' });
  
  // Return the save link
  return `https://pay.google.com/gp/v/save/${token}`;
}
