// /src/common/services/LoggingService.ts
/**
 * Logging Service
 * 
 * This service provides a consistent way to log information throughout the application.
 * It serves as a central place for all logging functionality, making it easier to:
 * 
 * Purpose:
 * - Create consistent log messages across the entire application
 * - Handle different logging behaviors between development and production
 * - Simplify logging by abstracting away the underlying logger implementation
 * - Make it easy to add context (metadata) to log messages
 * 
 * How it works:
 * - In development: Logs directly to the console for immediate feedback
 * - In production: Uses a structured logger that can send logs to monitoring systems
 * - Supports different log levels (info, error, warn, debug) for proper categorization
 * - Allows attaching metadata to provide additional context for troubleshooting
 * 
 * When to use each log level:
 * - info: Normal application events (user logged in, process completed)
 * - error: Something went wrong and needs attention
 * - warn: Potential issues that aren't failures but might need monitoring
 * - debug: Detailed information useful during development/debugging
 */

import { config } from "../../config/appConfig";
import logger from "@/lib/logger";

/**
 * Injectable service that provides consistent logging methods across the application
 * Can be injected into any class that needs logging capabilities
 */
export class LoggingService {
  /**
   * Log informational messages about application operation
   * 
   * Use for normal, expected operations like:
   * - Successful API calls
   * - User actions
   * - Process completions
   * 
   * @param message - The main log message describing what happened
   * @param metadata - Optional object with additional context about the event
   */
  info(message: string, metadata?: Record<string, any>): void {
    if (config.isDevelopment) {
      // In development, log directly to console for immediate feedback
      console.log(message, metadata ? metadata : '');
    } else {
      // In production, use structured logger for better searchability
      logger.info(message, { metadata });
    }
  }

  /**
   * Log error messages when something goes wrong
   * 
   * Use for unexpected failures or issues that need attention:
   * - API call failures
   * - Database errors
   * - Unhandled exceptions
   * 
   * @param message - Description of what went wrong
   * @param metadata - Usually includes the error object and context details
   */
  error(message: string, metadata?: Record<string, any>): void {
    if (config.isDevelopment) {
      // In development, show error in console with full context
      console.error(message, metadata);
    } else {
      // In production, format for error monitoring systems
      logger.error(message, { metadata });
    }
  }

  /**
   * Log warning messages for potential issues
   * 
   * Use for situations that aren't failures but might need attention:
   * - Deprecated feature usage
   * - Resource usage approaching limits
   * - Unexpected but handleable conditions
   * 
   * @param message - Description of the potential issue
   * @param metadata - Additional context about the warning
   */
  warn(message: string, metadata?: Record<string, any>): void {
    if (config.isDevelopment) {
      // In development, display warnings prominently in console
      console.warn(message, metadata ? metadata : '');
    } else {
      // In production, use structured logger
      logger.warn(message, { metadata });
    }
  }

  /**
   * Log detailed debug information
   * 
   * Use for verbose information helpful during development:
   * - Variable values during processing
   * - Flow control decisions
   * - Detailed timing information
   * 
   * Debug logs are typically only reviewed during troubleshooting
   * 
   * @param message - Detailed debug information
   * @param metadata - Additional context helpful for debugging
   */
  debug(message: string, metadata?: Record<string, any>): void {
    if (config.isDevelopment) {
      // In development, show all debug information
      console.debug(message, metadata ? metadata : '');
    } else {
      // In production, these might be filtered based on log level settings
      logger.debug(message, { metadata });
    }
  }
}