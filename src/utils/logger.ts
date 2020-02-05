import winston from "winston";

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: "info"
        })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
