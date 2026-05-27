import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  try {
    const { name, email, venue, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      console.warn("RESEND_API_KEY not set — contact form received but no email sent");
      return NextResponse.json({ success: true });
    }

    // Sanitize inputs for HTML injection in email templates
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeVenue = venue ? esc(venue) : "General";
    const safeMessage = esc(message);

    // Send notification to business
    await resend.emails.send({
      from: "Web Grupo Enjoy <web@grupoenjoy.es>",
      to: "info@grupoenjoy.es",
      subject: `Nuevo mensaje de contacto — ${safeVenue}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Local:</strong> ${safeVenue}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${safeMessage}</p>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "Grupo Enjoy <info@grupoenjoy.es>",
      to: email,
      subject: "Hemos recibido tu mensaje — Grupo Enjoy",
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px 24px;">
          <h1 style="font-size: 24px; text-align: center; letter-spacing: 2px;">GRUPO ENJOY</h1>
          <div style="border-top: 1px solid #222; padding-top: 24px; margin-top: 24px;">
            <p style="color: #d4d4d4; line-height: 1.6;">
              Hola ${safeName},<br><br>
              Hemos recibido tu mensaje y te responderemos lo antes posible.<br><br>
              &#161;Gracias por contactar con Grupo Enjoy!
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 16px; margin-top: 24px; text-align: center;">
            <p style="color: #666; font-size: 12px;">&copy; ${new Date().getFullYear()} Grupo Enjoy &middot; Alc&#250;dia, Mallorca</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
