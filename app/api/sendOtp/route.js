import { NextResponse } from "next/server";
import { redis } from "@/app/utils/redis";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ message: "Phone required" }, { status: 400 });
    }

    // 🚫 Check lock
    const isLocked = await redis.get(`otp_lock:${phone}`);
    if (isLocked) {
      return NextResponse.json(
        { message: "Too many attempts. Try later." },
        { status: 429 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP (5 min TTL)
    await redis.set(`otp:${phone}`, otp, { ex: 300 });

    // Reset attempts
    await redis.del(`otp_attempts:${phone}`);

    // 🔔 Send SMS (Twilio / MSG91)
    console.log(`OTP for ${phone}: ${otp}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}
