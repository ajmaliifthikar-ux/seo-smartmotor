const fs = require('fs');

const path = './src/lib/email.ts';
let content = fs.readFileSync(path, 'utf8');

const injection = `
export async function sendV2BookingConfirmation(email: string, bookingDetails: {
    bookingRef: string
    customerName: string
    services: string[]
    vehicle: string
    date: string
    time: string
}) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://smartmotorlatest.vercel.app'
    const manageLink = \`\${appUrl}/booking/\${bookingDetails.bookingRef}\`
    
    const html = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Smart Motor Booking Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#121212 0%,#1a1a1a 100%);border-radius:20px 20px 0 0;padding:48px 48px 40px;text-align:center;border-bottom:2px solid #E62329;">
              <h1 style="margin:0;color:white;font-size:32px;font-weight:900;letter-spacing:-0.03em;text-transform:uppercase;font-style:italic;line-height:1;">
                Booking <span style="color:#E62329;">Confirmed</span>
              </h1>
              <p style="margin:16px 0 0;color:rgba(255,255,255,0.5);font-size:13px;font-weight:500;">Please present this code upon arrival.</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#FAFAF9;padding:48px;">
              <p style="margin:0 0 16px;font-size:15px;color:#555555;line-height:1.7;">
                Dear <strong style="color:#121212;">\${bookingDetails.customerName}</strong>,<br/>
                Your slot at Smart Motor Performance has been secured.
              </p>

              <!-- QR Code / Ref Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#121212;border-radius:16px;padding:32px;text-align:center;">
                    <p style="margin:0 0 16px;font-size:10px;font-weight:900;color:#E62329;text-transform:uppercase;letter-spacing:0.4em;">Unique Booking Ref</p>
                    <div style="font-size:32px;font-weight:900;color:white;letter-spacing:0.1em;font-family:monospace;background:rgba(255,255,255,0.05);padding:16px;border-radius:8px;display:inline-block;border:1px solid rgba(255,255,255,0.1);">
                      \${bookingDetails.bookingRef}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <h3 style="margin:0 0 16px;font-size:16px;font-weight:900;color:#121212;text-transform:uppercase;">Appointment Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;background:white;border:1px solid #ECECEA;border-radius:12px;padding:20px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #ECECEA;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;font-weight:bold;display:block;margin-bottom:4px;">Vehicle</span>
                    <strong style="color:#121212;font-size:14px;">\${bookingDetails.vehicle}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #ECECEA;">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;font-weight:bold;display:block;margin-bottom:4px;">Date & Time</span>
                    <strong style="color:#121212;font-size:14px;">\${bookingDetails.date} at \${bookingDetails.time}</strong>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="\${manageLink}" style="display:inline-block;background:#121212;color:white;text-decoration:none;font-size:11px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;padding:18px 40px;border-radius:100px;">
                      Manage Booking
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:11px;color:#888;text-align:center;">You can reschedule or cancel your appointment up to 12 hours prior to the scheduled time.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#121212;border-radius:0 0 20px 20px;padding:32px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:10px;font-weight:900;color:white;text-transform:uppercase;letter-spacing:0.3em;">Smart Motor Performance</p>
              <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.4);">Musaffah M9, Abu Dhabi &nbsp;|&nbsp; Nadd Al Hamar, Dubai</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>\`

    return sendEmail({
        to: email,
        subject: \`[\${bookingDetails.bookingRef}] Smart Motor Booking Confirmed\`,
        html,
        text: \`Your booking at Smart Motor is confirmed. Reference: \${bookingDetails.bookingRef}. Date: \${bookingDetails.date} at \${bookingDetails.time}. Vehicle: \${bookingDetails.vehicle}. Manage your booking at: \${manageLink}\`,
    })
}

/**
 * Send admin notification
 */`;

content = content.replace('/**\n * Send admin notification\n */', injection);
fs.writeFileSync(path, content);
console.log('Updated email.ts');
