import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Nano Banana Master Banner Generator
// This route acts as a deterministic, brand-safe banner generator that completely avoids AI hallucination
// by directly compositing your exact logo, exact color palette (#121212, #E62329), and textures.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params for title and description
    const title = searchParams.get('title') || 'Smart Motor Auto Repair';
    const description = searchParams.get('description') || "Abu Dhabi's Premier Automotive Atelier";

    // Since we're in edge runtime, we fetch the logo from the deployed URL
    const logoUrl = new URL('/branding/logo.png', req.url).toString();

    // Fetch the brand fonts
    const [fontRegular, fontBold] = await Promise.all([
      fetch(new URL('/fonts/Inter-Regular.ttf', req.url)).then((res) => res.arrayBuffer()),
      fetch(new URL('/fonts/Inter-Bold.ttf', req.url)).then((res) => res.arrayBuffer()),
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121212',
            // Simple CSS gradient mimicking carbon fiber/dark texture for the background
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            color: '#FAFAF9',
            fontFamily: 'Inter',
          }}
        >
          {/* Safe Zone Container - 600x600 centered */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '800px', // Content centered within the safe zone
              height: '600px',
              textAlign: 'center',
            }}
          >
            {/* The Actual Brand Logo - No AI Hallucination */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Smart Motor Logo"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'contain',
                marginBottom: '40px',
              }}
            />
            
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#FAFAF9',
                marginBottom: '20px',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            
            <p
              style={{
                fontSize: '32px',
                fontWeight: 400,
                color: '#A3A3A3',
                maxWidth: '600px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>

            {/* Electric Red Accent Line */}
            <div
              style={{
                marginTop: '40px',
                width: '120px',
                height: '4px',
                backgroundColor: '#E62329',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: fontBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}