import * as nodemailer from 'nodemailer';
const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'mrafizayn@gmail.com',
        pass: 'nmsaqgllmlhddgwz',
    },
});
export { emailTransporter }