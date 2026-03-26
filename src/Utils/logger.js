import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    // ✅ Log errors separately
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // ✅ Log all requests
    new winston.transports.File({ filename: "logs/combined.log" }),

    // ✅ Show logs in console (dev)
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;