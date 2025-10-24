import nodemailer from 'nodemailer';
import config from '../config/index.js';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
});

export async function renderTemplate(templateName, payload = {}) {
    const file = path.join(__dirname, '..', 'templates', `${templateName}.ejs`);
    return ejs.renderFile(file, payload);
 
}

export async function sendEmail(to, subject, text) {
    const message = {
        from: "Mini_whatsapp app <noreply@mini-whatsapp.com>",
        to,
        subject,
        html: text,
    }

    try {
        const sending = await transporter.sendMail(message);

    } catch (error) {
        console.error("Error sending email:", error);
    }

    
}

export default { renderTemplate, sendEmail }