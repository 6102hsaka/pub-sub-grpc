import logger from "./logger";
import { createTopic } from "./client";

const topicName = process.argv[2];

if (!topicName) {
    logger.error(`Please provide topic name`);
} else {
    createTopic(topicName);
}
