const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'atuhflow-api' },
    transports: [
        new winston.transport.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
        }),
        new winston.transport.FIle({
            filename: path.join(__dirname, '../../logs/combine.log')
        })
    ]

})

if (process.env.NODE_ENV !== 'prouduction') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    )
}

module.exports = logger;