import { DeleteMessageBatchCommand, DeleteMessageCommand, ReceiveMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';
import { sqsClient } from './sqs-client.js';
dotenv.config();

const accountId = process.env.aws_sqs_account_id;
const queueName = process.env.aws_sqs_queue_name;
var params = {
    QueueUrl: `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`,
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0,
};

const receiveMessage = async () => {
    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params))
        if (data.Messages) {
            var deleteParams = {
                QueueUrl: `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`,
                Entries: data.Messages.map((val, key) => ({
                    Id: `${key}`,
                    ReceiptHandle: val.ReceiptHandle
                }))
            }
            try {
                const data = await sqsClient.send(new DeleteMessageBatchCommand(deleteParams))
                console.log("Message deleted")
            } catch (err) {
                console.log("SQS delete error", err)
            }
            return data.Messages
        } else {
            console.log("SQS no msg to delete")
        }
    } catch (err) {
        console.log("SQS Receive error", err)
    }
    return null
}

export { receiveMessage }