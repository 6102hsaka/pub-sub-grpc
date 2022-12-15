import chalk from "chalk";

type LogLevel = "INFO" | "WARN" | "ERROR";

const format = (level: LogLevel, message: string) => {
    const print =
        level === "INFO"
            ? chalk.gray
            : level === "WARN"
            ? chalk.yellow
            : chalk.red;
    return print(`${level} : ${new Date().toISOString()} : ${message}`);
};

const logger = {
    info: (message: string) => console.info(format("INFO", message)),
    warn: (message: string) => console.warn(format("WARN", message)),
    error: (message: string) => console.error(format("ERROR", message)),
};

export default logger;
