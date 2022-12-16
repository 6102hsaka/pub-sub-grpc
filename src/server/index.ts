import type { Options, PackageDefinition } from "@grpc/proto-loader";

import {
    loadPackageDefinition,
    Server,
    ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { join } from "path";

import logger from "../logger";
import * as SubjectServiceImpl from "./subject_service_impl";

const HOST_URL: string = "127.0.0.1:3000";
const PROTO_PATH: string = join(__dirname, "..", "proto", "subject.proto");
const protoOptions: Options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const main = () => {
    logger.info(`Initializing server at ${HOST_URL}`);
    const packageDefinition: PackageDefinition = loadSync(
        PROTO_PATH,
        protoOptions
    );
    const { SubjectService } = loadPackageDefinition(packageDefinition)
        .subject as any;

    const server = new Server();
    server.addService(SubjectService.service, SubjectServiceImpl);
    logger.info(
        `Added Implementation of ${SubjectService.serviceName} to Server`
    );

    server.bindAsync(
        HOST_URL,
        ServerCredentials.createInsecure(),
        (err: Error, port: number) => {
            if (!!err) {
                logger.error(`Error occured while initializing server\n${err}`);
            } else {
                server.start();
                logger.info(`Server started at Port: ${port}`);
            }
        }
    );
};

main();
