import { NextResponse } from "next/server";
import { otpStore } from "@/app/utils/otpStore";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { message: "Phone number required" },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expiry (5 mins)
    const expiresAt = Date.now() + 5 * 60 * 1000;

    // Store OTP
    otpStore.set(phone, { otp, expiresAt });

    // 🚨 Replace with SMS provider (Twilio / MSG91)
    console.log(`📨 OTP for ${phone}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
