import { v4 as uuidv4 } from "uuid";

import logger from "./logger";
import { publishMessage } from "./client";

const topicName = process.argv[2];

if (!topicName) {
    logger.error(`Please provide topic name`);
} else {
    let i = 1;
    const publisher = publishMessage();
    setInterval(() => {
        const message = {
            id: uuidv4(),
            topic: topicName,
            data: `message ${i++}`,
        };
        publisher.publish(message);
    }, 1000);
}
