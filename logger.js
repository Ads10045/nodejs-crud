const winston = require('winston');

const dev = process.env.NODE_ENV !== 'production';

const logger = winston.createLogger({
 

  level: dev ? 'debug' : 'info',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  //transports: [new winston.transports.Console()],
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: './logs/access.log',datePattern: 'yyyy-MM-DD', level: 'info' }),
    new winston.transports.File({ filename: './logs/error.log',datePattern: 'yyyy-MM-DD', level: 'error' }),
  ],


});





module.exports = logger;