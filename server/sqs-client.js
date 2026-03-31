import * as dotenv from 'dotenv';
dotenv.config();
import { SQSClient } from "@aws-sdk/client-sqs";

const config = {
    credentials: {
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key,
        sessionToken: process.env.aws_session_token
    },
    region: 'us-east-1'
}

// console.log(process.env)

const sqsClient = new SQSClient(config)
export { sqsClient }