import meta    from '../package.json';
import util    from 'util';
import winston from 'winston';

const endTime = new Date();

const { version }                          = meta;
const { promisify }                        = util;
const { createLogger, format, transports } = winston;

const jsonLoggerConfig = {
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

const jsonLogger = createLogger(jsonLoggerConfig);
const query      = promisify(jsonLogger.query).bind(jsonLogger);

const queryOptions = {
  limit: 1,
  order: `desc`,
};

const tsvLoggerConfig = {
  format: format.combine(
    format.timestamp(),
    format.printf(({ message, timestamp }) => `${timestamp}\t${message}`),
  ),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: `builds.tsv` }),
  ],
};

const tsvLogger = createLogger(tsvLoggerConfig);

async function endLog() {

  const { file: [logItem] } = await query(queryOptions);
  const startTime           = new Date(logItem.message.startTime);
  const buildTime           = endTime - startTime;

  jsonLogger.info({
    buildTime,
    endTime,
    version,
  });

  const buildTimeInSeconds = buildTime / 1000;

  tsvLogger.info(`${version}\t${buildTimeInSeconds}`);

  console.info(`PDF built in ${buildTimeInSeconds} seconds`);

}

endLog();
