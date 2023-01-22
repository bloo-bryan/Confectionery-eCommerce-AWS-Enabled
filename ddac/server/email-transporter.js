import * as nodemailer from 'nodemailer';
const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: '',
    },
});
export { emailTransporter }