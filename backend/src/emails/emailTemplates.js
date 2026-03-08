export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;500&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; padding: 0; background-color: #EEEBE4; font-family: 'Lato', Georgia, serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #EEEBE4; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">

            <!-- Header -->
            <tr>
              <td style="background-color: #1B2D4F; padding: 48px 50px 40px; border-radius: 4px 4px 0 0; text-align: center;">
                
                <!-- Monogram logo -->
                <div style="display: inline-block; width: 58px; height: 58px; border-radius: 50%; border: 1.5px solid rgba(212,196,166,0.5); line-height: 58px; text-align: center; margin-bottom: 24px;">
                  <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: #D4C4A6; letter-spacing: 1px;">M</span>
                </div>

                <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 500; color: #F5F0E8; margin: 0 0 8px; letter-spacing: 0.5px;">
                  Welcome to Messenger
                </h1>
                <p style="font-family: 'Lato', sans-serif; font-size: 12px; color: #D4C4A6; letter-spacing: 3px; text-transform: uppercase; margin: 0; font-weight: 300;">
                  Your space to connect
                </p>

              </td>
            </tr>

            <!-- Thin gold divider line -->
            <tr>
              <td style="background-color: #1B2D4F; padding: 0 50px;">
                <div style="height: 1px; background: linear-gradient(to right, transparent, #D4C4A6, transparent);"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background-color: #FDFAF5; padding: 48px 50px 40px;">

                <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #1B2D4F; margin: 0 0 20px; font-weight: 400;">
                  Dear ${name},
                </p>

                <p style="font-family: 'Lato', sans-serif; font-size: 15px; color: #5C5346; line-height: 1.8; margin: 0 0 28px; font-weight: 300;">
                  We're delighted to welcome you to Messenger — a thoughtfully crafted space for meaningful conversations. Whether you're reconnecting with friends, coordinating with colleagues, or staying close to family, we're here to make every exchange feel effortless.
                </p>

                <!-- Steps card -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F0E8; border-radius: 4px; margin-bottom: 36px;">
                  <tr>
                    <td style="padding: 28px 30px 24px;">
                      <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 14px; color: #1B2D4F; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 20px; font-weight: 500;">
                        Getting Started
                      </p>

                      <!-- Step 1 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #1B2D4F; text-align: center; line-height: 22px;">
                              <span style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; font-weight: 500;">1</span>
                            </div>
                          </td>
                          <td>
                            <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #3D3529; margin: 2px 0 0; font-weight: 400;">Set up your profile picture</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 2 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #1B2D4F; text-align: center; line-height: 22px;">
                              <span style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; font-weight: 500;">2</span>
                            </div>
                          </td>
                          <td>
                            <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #3D3529; margin: 2px 0 0; font-weight: 400;">Find and add your contacts</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 3 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #1B2D4F; text-align: center; line-height: 22px;">
                              <span style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; font-weight: 500;">3</span>
                            </div>
                          </td>
                          <td>
                            <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #3D3529; margin: 2px 0 0; font-weight: 400;">Start your first conversation</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 4 -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #1B2D4F; text-align: center; line-height: 22px;">
                              <span style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; font-weight: 500;">4</span>
                            </div>
                          </td>
                          <td>
                            <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #3D3529; margin: 2px 0 0; font-weight: 400;">Share photos, videos, and more</p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <!-- CTA Button -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 36px;">
                  <tr>
                    <td align="center">
                      <a href="${clientURL}" style="display: inline-block; background-color: #1B2D4F; color: #F5F0E8; text-decoration: none; font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; padding: 16px 40px; border-radius: 2px;">
                        Open Messenger
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #7A7066; line-height: 1.8; margin: 0 0 6px; font-weight: 300;">
                  Should you have any questions, our team is always here to help.
                </p>
                <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #7A7066; line-height: 1.8; margin: 0 0 32px; font-weight: 300;">
                  We hope Messenger brings you closer to the people that matter most.
                </p>

                <!-- Signature divider -->
                <div style="height: 1px; background-color: #E8E0D0; margin-bottom: 24px;"></div>

                <p style="font-family: 'Lato', sans-serif; font-size: 14px; color: #5C5346; margin: 0; font-weight: 300;">
                  With warmth,<br>
                  <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #1B2D4F; font-weight: 500;">The Messenger Team</span>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #2C3E5A; padding: 24px 50px; border-radius: 0 0 4px 4px; text-align: center;">
                <p style="font-family: 'Lato', sans-serif; font-size: 11px; color: #8A9BB5; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px; font-weight: 300;">
                  © 2025 Messenger · All Rights Reserved
                </p>
                <p style="margin: 0;">
                  <a href="#" style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; text-decoration: none; letter-spacing: 1px; margin: 0 14px; font-weight: 300;">Privacy Policy</a>
                  <span style="color: #4A5E7A;">·</span>
                  <a href="#" style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; text-decoration: none; letter-spacing: 1px; margin: 0 14px; font-weight: 300;">Terms of Service</a>
                  <span style="color: #4A5E7A;">·</span>
                  <a href="#" style="font-family: 'Lato', sans-serif; font-size: 11px; color: #D4C4A6; text-decoration: none; letter-spacing: 1px; margin: 0 14px; font-weight: 300;">Contact Us</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}
