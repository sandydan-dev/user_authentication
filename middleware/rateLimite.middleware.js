const rateLimiter = require("express-rate-limit");

// rate limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // each IP can make 10 requests
  message: "please try again later",

  // error handling
  handler: (req, res, next, options) => {
    try {
      res.status(429).json({
        success: false,
        error: "Too many requests",
        message: options.message,
        retryAfter: `15 minutes`,
      });
    } catch (error) {
      console.error("Unexpected error in rate limiter:", error);

      next(new Error("Rate limit exceeded"));
    }
  },
});
module.exports = limiter;
