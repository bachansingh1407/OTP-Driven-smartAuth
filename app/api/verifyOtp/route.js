import { NextResponse } from "next/server";
import { redis } from "@/app/utils/redis";

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { message: "Phone and OTP required" },
        { status: 400 }
      );
    }

    const savedOtp = await redis.get<string>(`otp:${phone}`);

    if (!savedOtp) {
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    // ❌ Invalid OTP
    if (otp !== savedOtp) {
      const attempts = (await redis.incr(`otp_attempts:${phone}`)) || 1;

      // lock after 3 tries
      if (attempts >= 3) {
        await redis.set(`otp_lock:${phone}`, true, { ex: 900 });
        await redis.del(`otp:${phone}`);
      }

      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // ✅ SUCCESS
    await redis.del(`otp:${phone}`);
    await redis.del(`otp_attempts:${phone}`);

    // 👉 Create session / JWT here
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
