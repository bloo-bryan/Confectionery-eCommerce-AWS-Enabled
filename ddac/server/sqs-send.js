import * as dotenv from 'dotenv';
dotenv.config();

import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from './sqs-client.js';


const sendMessage = async (msgBody) => {
    // Create an SQS service object
    // var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

    const accountId = process.env.aws_account_id;
    const queueName = process.env.aws_queue_name;
    var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        // DelaySeconds: 10,
        MessageBody: msgBody,
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`,
        QueueName: queueName,
    };

    // const command = new AddPermissionCommand(params)
    try {
        const command = await sqsClient.send(new SendMessageCommand(params));
        return command
    } catch (error) {
        console.log("SQS Send Error", error);
        return error;
    }
}

export { sendMessage }