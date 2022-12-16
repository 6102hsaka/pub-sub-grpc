import type { ServerErrorResponse } from "@grpc/grpc-js";

const TOPIC_NOT_FOUND: string = "TOPIC_NOT_FOUND";
const TOPIC_ALREADY_EXISTS: string = "TOPIC_ALREADY_EXISTS";
const SUBSCRIBER_NOT_FOUND: string = "SUBSCRIBER_NOT_FOUND";
const SUBSCRIBER_ALREADY_EXISTS: string = "SUBSCRIBER_ALREADY_EXISTS";

export const topicNotFound = (name: string): ServerErrorResponse => ({
    name: TOPIC_NOT_FOUND,
    message: `Topic ${name} not found`,
});

export const duplicateTopic = (name: string): ServerErrorResponse => ({
    name: TOPIC_ALREADY_EXISTS,
    message: `Topic ${name} already exists`,
});

export const subscriberNotFound = (
    id: string,
    topic: string
): ServerErrorResponse => ({
    name: SUBSCRIBER_NOT_FOUND,
    message: `Subscriber ${id} not subscribed to topic ${topic}`,
});

export const duplicateSubscriber = (
    id: string,
    topic: string
): ServerErrorResponse => ({
    name: SUBSCRIBER_ALREADY_EXISTS,
    message: `Subscriber ${id} is already subscribed to topic ${topic}`,
});
