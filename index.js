const winston = require('winston');

const { createLogger, format } = winston;

function getReq(info) {
  try {
    return info.meta.req;
  } catch (e) {
    return;
  }
}

const prodFormat = ({ requestIdGetter }) => {
  const prodFormat = format((info) => {
    const fields = {
      [Symbol.for('level')]: info.level, // required by Winston
      level: info.level.toUpperCase(),
      message: info.message,
    };
    const req = getReq(info);
    let requestId;
    if (req) {
      fields.http_method = req.method;
      fields.http_path = req.url;
      fields.http_host = req.headers.host;
      requestIdGetter && (requestId = requestIdGetter(req));
      requestId && (fields.request_id = requestId);
    }
    return fields;
  });
  return prodFormat();
};

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

const createProdLogger = ({ requestIdGetter }) => createLogger({
  format: format.combine(
    format.timestamp(),
    prodFormat({ requestIdGetter }),
    format.json()
  ),

  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false
});

const getPreconfiguredLogger = ({ environment, requestIdGetter }) => {
  return environment === 'production' ? createProdLogger({ requestIdGetter }) : createDevLogger();
};

module.exports = {
  getPreconfiguredLogger
};
