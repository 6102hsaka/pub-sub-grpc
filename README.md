# pub-sub-grpc
A **Publish/Subscribe service** build in node js using [gRPC](https://grpc.io/docs/languages/node/). It allows asynchronous service-to-service communication via multiple topics. It involves
* Publisher who sends a message
* Subscriber who receives the message

## Getting Started
Publish/subscribe or pub/sub messaging is a simple but powerful approach to communicate asynchronously in serverless and microservices architectures. It decouples services producing messages from services processing those messages. Publisher can send messages to a topic, and all subscriber of that topic will receive messages instantly.

### Services
 * Create topic
 * Subscribe to a topic
 * Unsubscribe from a topic
 * Publish message to a topic
 
 #### Postman sample request screenshot
 
![create-topic](https://drive.google.com/uc?export=view&id=1_xsfr9d1Jo10rAAavPQdX7j-4zEFoqN2)
\
![subscribe](https://drive.google.com/uc?export=view&id=1kKQS0rHTQ0u0yJwz3cl6cgNyu5gvp1Lt)
\
![publish](https://drive.google.com/uc?export=view&id=1B0MVJjAcW0TInEuwkxHIAH37-CjxzG8c)

### Installation
Clone this repository to your local workspace
```
git clone https://github.com/6102hsaka/pub-sub-grpc.git
```
\
Install required node modules
```
npm install
```
\
Launch application to run the server
```
npm start
```
\
To create a topic
```
npm run create-topic topic-name
```
\
To create subscriber
```
npm run subscriber topic-name
```
\
To create publisher
```
npm run publisher topic-name
```
