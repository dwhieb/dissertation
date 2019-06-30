import meta    from '../package.json';
import winston from 'winston';

const { createLogger, format, transports } = winston;

const config = {
  format: format.combine(
    format.label({ label: `start`, message: false }),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: `builds.log` }),
  ],
};

const logger = createLogger(config);

logger.info({
  startTime: new Date,
  version:   meta.version,
});
