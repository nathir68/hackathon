const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        let transporter;
        // Check if user is using the dummy credentials
        if (!process.env.SMTP_EMAIL || process.env.SMTP_EMAIL.includes('YOUR_SMTP_EMAIL')) {
            // Generate test SMTP service account from ethereal.email
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });
            console.log(`\n📧 Using Mock Email Server. An email to ${options.email} is being simulated.`);
        } else {
            // Create a real transporter
            transporter = nodemailer.createTransport({
                service: 'gmail', // Use Gmail or your preferred provider
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
        }

        // Define email options
        const mailOptions = {
            from: `"H.I.R.E. AI System" <${process.env.SMTP_EMAIL || 'noreply@hire-ai.com'}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        if (!process.env.SMTP_EMAIL || process.env.SMTP_EMAIL.includes('YOUR_SMTP_EMAIL')) {
            console.log("Preview Email URL: %s", nodemailer.getTestMessageUrl(info));
        }
    } catch (error) {
        console.error("Failed to send email:", error.message);
        // We don't throw the error so the main process (like applying for a job) doesn't crash
    }
};

module.exports = sendEmail;
