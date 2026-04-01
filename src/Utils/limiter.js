import { rateLimit } from "express-rate-limit";

// 🔐 Auth  (login, signup, otp)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,

 handler: (req, res) => {
  const now = Date.now();
  const resetTime = new Date(req.rateLimit.resetTime).getTime();

  const retryAfterSeconds = Math.ceil((resetTime - now) / 1000);

  const minutes = Math.floor(retryAfterSeconds / 60);
  const seconds = retryAfterSeconds % 60;

  res.status(429).json({
    status: "fail",
    message: `Try again in ${minutes}m ${seconds}s`,
  });
}
});


// Aply and Save
export const actionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // enough for real users
  handler: (req, res) => {
  const now = Date.now();
  const resetTime = new Date(req.rateLimit.resetTime).getTime();

  const retryAfterSeconds = Math.ceil((resetTime - now) / 1000);

  const minutes = Math.floor(retryAfterSeconds / 60);
  const seconds = retryAfterSeconds % 60;

  res.status(429).json({
    status: "fail",
    message: `Wait ${minutes}m ${seconds}s and try again.`,
  });
}
});


// 📂 Upload limiter (very important)
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  handler: (req, res) => {
  const now = Date.now();
  const resetTime = new Date(req.rateLimit.resetTime).getTime();

  const retryAfterSeconds = Math.ceil((resetTime - now) / 1000);

  const minutes = Math.floor(retryAfterSeconds / 60);
  const seconds = retryAfterSeconds % 60;

  res.status(429).json({
    status: "fail",
    message: `Wait ${minutes}m ${seconds}s and try again.`,
  });
}
});