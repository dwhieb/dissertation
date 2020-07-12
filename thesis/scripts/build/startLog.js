import { createRequire } from 'module';
import winston           from 'winston';

const require = createRequire(import.meta.url);

const { version } = require(`../../../package.json`);

const { createLogger, format, transports } = winston;

const config = {
  format: format.combine(
    format.label({ label: `start`, message: false }),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: `thesis/builds.log` }),
  ],
};

const logger = createLogger(config);

logger.info({
  startTime: new Date,
  version,
});
