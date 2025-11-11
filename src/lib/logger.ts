// /src/common/utils/logger.ts

import { createLogger, format, transports } from 'winston';

/**
 * Winston logger configuration
 */
const logger = createLogger({
  format: format.combine(
    format.printf(({ level, message, metadata }) => {
      if (metadata && Object.keys(metadata).length > 0) {
        return `${level}: ${message} ${JSON.stringify(metadata)}`;
      }
      return `${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error']
    })
  ]
});

export default logger;