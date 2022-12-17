import logger from "../logger";

export const createTopicImpl = (client, name): Promise<void> => {
    logger.info(`Creating topic ${name}`);
    return new Promise((resolve, reject) => {
        client.createTopic(
            {
                name,
            },
            (err, _) => {
                if (!!err) {
                    logger.error(
                        `Error occured while creating topic ${name}\n${err}`
                    );
                    reject(err);
                } else {
                    logger.info(`Topic ${name} created successfully`);
                    resolve();
                }
            }
        );
    });
};

export const subscribeImpl = (client, id, topic) => {
    logger.info(`Subscribing to topic ${topic}`);

    const call = client.subscribe({
        id,
        topic,
    });

    call.on("data", (message) =>
        logger.info(`[Received Message] ${JSON.stringify(message)}`)
    );

    call.on("error", (err) => logger.error(err));

    return {
        unsubscribe: () => {
            logger.info(`Unsubscribing from topic ${topic}`);
            client.unsubscribe({ id, topic }, (err, _) => {
                if (!!err) {
                    logger.error(`Error occured while unsubscribing\n${err}`);
                } else {
                    logger.info(`Unsubscribed from topic ${topic}`);
                }
            });
        },
    };
};

export const publishMessageImpl = (client) => {
    const call = client.publishMessage();

    call.on("data", (message) =>
        logger.info(`[Received Message] ${JSON.stringify(message)}`)
    );

    call.on("error", (err) => logger.error(err));

    return {
        publish: (message) => {
            logger.info(`[Publishing Message] ${JSON.stringify(message)}`);
            call.write(message);
        },
    };
};
