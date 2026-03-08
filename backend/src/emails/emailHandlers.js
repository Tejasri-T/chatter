import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import { resendClient, sender } from "../lib/resend.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to Chatter!',
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if (error){
        console.error('Failed to send welcome email:', error);
        throw new Error('Failed to send welcome email');
      }

      console.log('Welcome email sent successfully:', data);


}