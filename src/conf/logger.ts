import { createLogger, format, transports } from 'winston';

const MAX_LOG_SIZE = 1024000;

const level = process.env.LOG_LEVEL || 'debug';

const logger = createLogger({
    level,
    format: format.json(),
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error', maxsize: MAX_LOG_SIZE }),
    ]
});

if (process.env.ENV === 'development') {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp(),
                format.align(),
                format.printf(info => {
                    return `${info.timestamp} [${info.level}]: ${info.message}`;
                })
            )
        })
    );
}

export default logger;
