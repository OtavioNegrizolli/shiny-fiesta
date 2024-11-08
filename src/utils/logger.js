import pino from "pino";

/**
 * @typedef CustomLevels
 * @type {string}
 **/
/**
 * @type {pino.Logger<CustomLevels>} - pino logger
 */
const logger = pino();

export default logger;
