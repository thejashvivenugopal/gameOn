import nodemailer from "nodemailer";

export const emailHelper = async (to, subject, otp) => {
  try {
    // Validation
    if (!to || !subject || !otp) {
      console.log("All fields are required (to, subject, otp).");
      return false;
    }

    // Create reusable transporter using Gmail or any email service
    const transporter = nodemailer.createTransport({
      service: process.env.emailService, // Use your email service provider
      auth: {
        user: process.env.emailId, // Replace with your email
        pass: process.env.emailPass, // Replace with your email password or app password
      },
    });

    // Email template in HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center;">
          <<img src="..\src\assets\images\logo.jpeg" alt="GameOn Logo" />" alt="GAME ON" style="width: 120px; margin-bottom: 20px;" />
        </div>
        <h2 style="text-align: center; color: #333;">Hey There!</h2>
        <p style="font-size: 16px; color: #555; text-align: center;">
          Enter the code given below on the GAMEON Website to update Forgot password and continue enjoying.
        </p>
        <h1 style="text-align: center; background-color: #f8f8f8; padding: 10px 20px; border-radius: 5px; color: #ff5722;">${otp}</h1>
        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px;">
          Note: Never share confidential information like Card number, Card expiry date, CVV, OTP, or Internet Password with anyone.
        </p>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: process.env.emailId, // Sender address
      to, // Receiver email
      subject, // Email subject
      html: htmlContent, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
