import logger from "./logger";
import { subscribe } from "./client";

const topicName = process.argv[2];
const timeout = process.argv[3];

if (!topicName) {
    logger.error(`Please provide topic name`);
} else {
    const subscriber = subscribe(topicName);
    if (!!timeout) {
        setTimeout(() => subscriber.unsubscribe(), parseInt(timeout));
    }
}
