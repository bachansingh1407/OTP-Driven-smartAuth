import { NextResponse } from "next/server";
import { otpStore } from "@/app/utils/otpStore";

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { message: "Phone and OTP required" },
        { status: 400 }
      );
    }

    const storedOtp = otpStore.get(phone);

    if (!storedOtp) {
      return NextResponse.json(
        { message: "OTP expired or not found" },
        { status: 400 }
      );
    }

    const { otp: savedOtp, expiresAt } = storedOtp;

    if (Date.now() > expiresAt) {
      otpStore.delete(phone);
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    if (otp !== savedOtp) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // ✅ OTP VERIFIED
    otpStore.delete(phone);

    // 👉 SAVE USER TO DB HERE
    // await User.create({ phone }) OR update lastLogin

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "OTP verification failed" },
      { status: 500 }
    );
  }
}
