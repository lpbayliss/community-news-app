import * as winston from "winston";

interface LoggerOptions {
	includeTimestamp?: boolean;
	includeLevel?: boolean;
	formatJson?: boolean;
}

export function createLogger(
	name: string,
	opts: LoggerOptions = {
		includeTimestamp: true,
		includeLevel: true,
		formatJson: true,
	},
) {
	const format = winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss.SSS",
		}),
		winston.format.printf(({ level, message, timestamp, ...meta }) => {
			let logStr = "";

			if (opts.includeTimestamp) logStr += `[${timestamp}]`;
			if (opts.includeLevel) logStr += `[${level}]`;

			logStr += `[${message}]`;

			if (level === "error") {
				const error = meta.error as
					| { name: string; message: string; stack: string }
					| undefined;
				if (error !== undefined) {
					logStr += `\n	Name: ${error.name}`;
					logStr += `\n	Message: ${error.message}`;
					logStr += `\n	Stack: ${error.stack}`;
				}
			}

			return logStr;
		}),
		winston.format.colorize({ all: true }),
	);

	const winstonLogger = winston.createLogger({
		level: "debug",
		defaultMeta: { name },
		format,
		transports: [new winston.transports.Console()],
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const info = (message: string, additionalData?: Record<string, any>) =>
		winstonLogger.info(message, additionalData);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const warn = (message: string, additionalData?: Record<string, any>) =>
		winstonLogger.warn(message, additionalData);

	const error = (
		message: string,
		error?: Error,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		additionalData?: Record<string, any>,
	) => {
		const errorData = error
			? {
					error: {
						name: error.name,
						message: error.message,
						stack: error.stack,
					},
				}
			: {};

		winstonLogger.error(message, { ...errorData, ...additionalData });
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const debug = (message: string, additionalData?: Record<string, any>) =>
		winstonLogger.debug(message, additionalData);

	return {
		info,
		warn,
		error,
		debug,
	};
}

export type Logger = ReturnType<typeof createLogger>;
