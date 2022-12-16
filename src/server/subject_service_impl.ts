import type {
    ServerErrorResponse,
    ServerUnaryCall,
    sendUnaryData,
    ServerWritableStream,
    ServerDuplexStream,
} from "@grpc/grpc-js";

import logger from "../logger";
import {
    duplicateTopic,
    topicNotFound,
    duplicateSubscriber,
    subscriberNotFound,
} from "./utils";

const topicSubscription = new Map();

export const createTopic = (
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>
): void => {
    logger.info(`Initializing: createTopic`);
    const { name } = call.request;
    let err: ServerErrorResponse = null;
    if (topicSubscription.has(name)) {
        err = duplicateTopic(name);
        logger.error(JSON.stringify(err));
    } else {
        topicSubscription.set(name, []);
        logger.info(`Created topic: ${name}`);
    }
    callback(err, {});
};

export const subscribe = (call: ServerWritableStream<any, any>): void => {
    logger.info(`Initializing: subscribe`);
    const { id, topic } = call.request;
    let err: ServerErrorResponse = null;
    if (!topicSubscription.has(topic)) {
        err = topicNotFound(topic);
    } else {
        const subscriberList = topicSubscription.get(topic);
        const index = subscriberList.findIndex(
            (subscriber) => subscriber.id === id
        );
        if (index !== -1) {
            err = duplicateSubscriber(id, topic);
        } else {
            const subscriber = {
                id,
                call,
            };
            subscriberList.push(subscriber);
            logger.info(`Subscriber ${id} subscribed to topic ${topic}`);
        }
    }
    if (!!err) {
        logger.error(JSON.stringify(err));
        call.destroy(err);
    }
};

export const unsubscribe = (
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>
): void => {
    logger.info(`Initializing: unsubscribe`);
    const { id, topic } = call.request;
    let err: ServerErrorResponse = null;
    if (!topicSubscription.has(topic)) {
        err = topicNotFound(topic);
    } else {
        const subscriberList = topicSubscription.get(topic);
        const index = subscriberList.findIndex(
            (subscriber) => subscriber.id === id
        );
        if (index === -1) {
            err = subscriberNotFound(id, topic);
        } else {
            const subscriber = subscriberList[index];
            subscriber.call.end();
            subscriberList.splice(index, 1);
            logger.info(`Subscriber ${id} unsubscribed from topic ${topic}`);
        }
    }
    if (!!err) {
        logger.error(JSON.stringify(err));
    }
    callback(err, {});
};

export const publishMessage = (call: ServerDuplexStream<any, any>): void => {
    logger.info(`Initializing: publishMessage`);
    let err: ServerErrorResponse = null;
    call.on("data", (message) => {
        if (!topicSubscription.has(message.topic)) {
            err = topicNotFound(message.topic);
            logger.error(JSON.stringify(err));
            call.write(err);
        } else {
            const subscriberList = topicSubscription.get(message.topic);
            subscriberList.forEach((subscriber) =>
                subscriber.call.write(message)
            );
            logger.info(`Published Message: ${message}`);
        }
    });
};
