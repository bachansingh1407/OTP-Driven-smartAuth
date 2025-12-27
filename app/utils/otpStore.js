// ❗ DEV ONLY – Use Redis / DB in production

const globalForOtp = globalThis;

if (!globalForOtp.__otpStore) {
  globalForOtp.__otpStore = new Map();
}

export const otpStore = globalForOtp.__otpStore;

/*
  structure:
  phone => { otp, expiresAt }
*/
