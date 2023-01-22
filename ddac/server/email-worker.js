import { receiveMessage } from "./sqs-receive.js"
setInterval(async () => {
    const data = await receiveMessage();
    console.log(data)
}, 5000)