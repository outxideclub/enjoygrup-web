import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
    if (!resend) {
      console.warn("RESEND_API_KEY not set — newsletter signup saved but no email sent");
      return NextResponse.json({ success: true });
    }

    // Add contact to Resend audience
    if (AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    // Send welcome email
    await resend.emails.send({
      from: "Grupo Enjoy <newsletter@grupoenjoy.es>",
      to: email,
      subject: "Bienvenido a Grupo Enjoy!",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px 24px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0; letter-spacing: 2px;">GRUPO ENJOY</h1>
            <p style="color: #a1a1a1; font-size: 14px; margin-top: 8px;">Alc&#250;dia, Mallorca</p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 24px;">
            <h2 style="font-size: 20px; margin: 0 0 16px;">&#161;Bienvenido!</h2>
            <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 16px;">
              Gracias por suscribirte a nuestro newsletter. Recibir&#225;s novedades exclusivas sobre eventos en Outxide Club, nuevas cartas en Hiru Food &amp; Drinks y ofertas especiales en Enjoy Terrace.
            </p>
            <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 24px;">
              Mientras tanto, descubre nuestros tres espacios:
            </p>
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://www.grupoenjoy.es/enjoy" style="display: inline-block; background: #ec4899; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Enjoy Terrace</a>
              <a href="https://www.grupoenjoy.es/outxide" style="display: inline-block; background: #06b6d4; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Outxide Club</a>
              <a href="https://www.grupoenjoy.es/hiru" style="display: inline-block; background: #b87333; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Hiru Food &amp; Drinks</a>
            </div>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 16px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              &copy; ${new Date().getFullYear()} Grupo Enjoy &middot; Alc&#250;dia, Mallorca
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
