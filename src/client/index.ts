import type { Options, PackageDefinition } from "@grpc/proto-loader";

import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

import logger from "../logger";
import { createTopicImpl, subscribeImpl, publishMessageImpl } from "./utils";

const HOST_URL: string = "127.0.0.1:3000";
const PROTO_PATH: string = join(__dirname, "..", "proto", "subject.proto");
const protoOptions: Options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

type ClientType = "Publisher" | "Subscriber" | "Root";

const createClient = (clientType: ClientType, id: string) => {
    logger.info(`Creating ${clientType} ${id}`);
    const packageDefinition: PackageDefinition = loadSync(
        PROTO_PATH,
        protoOptions
    );
    const { SubjectService } = loadPackageDefinition(packageDefinition)
        .subject as any;

    const client = new SubjectService(HOST_URL, credentials.createInsecure());
    logger.info(`Created ${clientType} ${id}`);
    return client;
};

export const createTopic = (name): Promise<void> => {
    const client = createClient("Root", "root-client");
    return createTopicImpl(client, name);
};

export const subscribe = (topic) => {
    const id = uuidv4();
    const client = createClient("Subscriber", id);
    return subscribeImpl(client, id, topic);
};

export const publishMessage = () => {
    const id = uuidv4();
    const client = createClient("Publisher", id);
    return publishMessageImpl(client);
};
