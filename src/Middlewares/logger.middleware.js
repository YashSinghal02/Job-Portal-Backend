import morgan from "morgan";
import logger from "../Utils/logger.js";

// ♦ Custom stream for Morgan → Winston
const stream = {
  write: (message) => logger.info(message.trim()),
};

// ♦ Morgan middleware
export const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);