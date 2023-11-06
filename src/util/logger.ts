import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const environment = process.env.NODE_ENV || "development";
const transport = new DailyRotateFile({
  level: "info",
  dirname: "src/logs",
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "1d",
});

transport.on("rotate", function (oldFilename, newFilename) {
  console.log(`Log file rotated. Old: ${oldFilename}, New: ${newFilename}`);
});

export const logger = createLogger({
  transports: [transport],
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.json()
    // format.prettyPrint()
  ),
  defaultMeta: { environment },
});
