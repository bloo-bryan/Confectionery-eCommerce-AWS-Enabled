import { emailTransporter } from "./email-transporter.js";
import { receiveMessage } from "./sqs-receive.js"
setInterval(async () => {

    const data = await receiveMessage();
    if (data.length) {
        data.map((val, key) => {
            // console.log(val)
            try {
                const msgBody = JSON.parse(val.Body);
                emailTransporter.sendMail({
                    from: '"DDAC" <yourddac@gmail.com>', // sender address
                    to: msgBody.to, // list of receivers
                    subject: msgBody.subject, // Subject line
                    text: msgBody.text, // plain text body
                    html: msgBody.html, // html body
                }).then(info => {
                    console.log({ info });
                }).catch(console.error);
            } catch (err) {
                console.log("error", err)
            }

        })
    }
    console.log(data)
}, 5000)