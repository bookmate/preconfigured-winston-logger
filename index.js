const winston = require('winston');
const property = require('lodash/property');

const { createLogger, format } = winston;

const prodFormat = format((info) => {
  const fields = {
    [Symbol.for('level')]: info.level, // required by Winston
    level: info.level.toUpperCase(),
    message: info.message,
  };
  const req = property('meta.req')(info);
  if (req) {
    fields.http_method = req.method;
    fields.http_path = req.url;
    fields.http_host = req.headers.host;
  }
  return fields;
});

const createDevLogger = () => createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),

  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false
});

const createProdLogger = () => createLogger({
  format: format.combine(
    format.timestamp(),
    prodFormat(),
    format.json()
  ),

  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false
});

const getPreconfiguredLogger = ({ environment }) => {
  return environment === 'production' ? createProdLogger() : createDevLogger();
};

module.exports = {
  getPreconfiguredLogger
};
