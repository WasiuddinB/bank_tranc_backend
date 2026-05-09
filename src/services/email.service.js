require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to the email server", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Wasi Uddin B" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email", error);
  }
};

async function sendRegisterEmail(userEmail, name) {
  const subject = "Welcome to Wasi B Backend Ledger";

  const text = `
Hello ${name},

Thank you for registering with Wasi B Backend Ledger.

Your account has been successfully created, and we are excited to have you onboard. 
You can now access the platform and start managing your activities seamlessly.

If you have any questions or require assistance, feel free to contact our support team.

Best regards,
Wasi B Backend Ledger Team
  `;

  const html = `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f9;
    padding: 40px 20px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    ">
      
      <h1 style="
        color: #1f2937;
        margin-bottom: 20px;
        text-align: center;
      ">
        Welcome to Wasi B Backend Ledger
      </h1>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Hello <strong>${name}</strong>,
      </p>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Thank you for registering with <strong>Wasi B Backend Ledger</strong>.
      </p>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Your account has been successfully created, and you can now start using the platform.
      </p>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        If you have any questions or need assistance, please feel free to contact our support team.
      </p>

      <div style="
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 14px;
        text-align: center;
      ">
        © ${new Date().getFullYear()} Wasi B Backend Ledger. All rights reserved.
      </div>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful - Wasi B Backend Ledger";

  const text = `
Hello ${name},

Your transaction has been completed successfully.

Transaction Details:
--------------------------------
Amount Sent: ${amount}
Recipient Account: ${toAccount}
Status: Successful
--------------------------------

Thank you for using Wasi B Backend Ledger.

If you did not authorize this transaction or need assistance, please contact our support team immediately.

Best regards,
Wasi B Backend Ledger Team
  `;

  const html = `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f9;
    padding: 40px 20px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    ">

      <h1 style="
        color: #1f2937;
        margin-bottom: 20px;
        text-align: center;
      ">
        Transaction Successful
      </h1>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Hello <strong>${name}</strong>,
      </p>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Your transaction has been completed successfully.
      </p>

      <div style="
        margin: 30px 0;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 20px;
      ">

        <p style="
          margin: 10px 0;
          color: #111827;
          font-size: 16px;
        ">
          <strong>Amount Sent:</strong> ${amount}
        </p>

        <p style="
          margin: 10px 0;
          color: #111827;
          font-size: 16px;
        ">
          <strong>Recipient Account:</strong> ${toAccount}
        </p>

        <p style="
          margin: 10px 0;
          color: #16a34a;
          font-size: 16px;
          font-weight: bold;
        ">
          Status: Successful
        </p>

      </div>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Thank you for using <strong>Wasi B Backend Ledger</strong>.
      </p>

      <p style="
        color: #6b7280;
        font-size: 14px;
        line-height: 1.8;
      ">
        If you did not authorize this transaction or need assistance,
        please contact our support team immediately.
      </p>

      <div style="
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 14px;
        text-align: center;
      ">
        © ${new Date().getFullYear()} Wasi B Backend Ledger. All rights reserved.
      </div>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed - Wasi B Backend Ledger";

  const text = `
Hello ${name},

We regret to inform you that your recent transaction could not be completed.

Transaction Details:
--------------------------------
Amount Attempted: ${amount}
Recipient Account: ${toAccount}
Status: Failed
--------------------------------

Possible reasons may include:
- Insufficient balance
- Invalid recipient account
- Network or server issue

Please review the transaction details and try again.

If you continue facing issues or did not attempt this transaction, contact our support team immediately.

Best regards,
Wasi B Backend Ledger Team
  `;

  const html = `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f6f9;
    padding: 40px 20px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    ">

      <h1 style="
        color: #dc2626;
        margin-bottom: 20px;
        text-align: center;
      ">
        Transaction Failed
      </h1>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Hello <strong>${name}</strong>,
      </p>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        We regret to inform you that your recent transaction could not be completed.
      </p>

      <div style="
        margin: 30px 0;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 20px;
      ">

        <p style="
          margin: 10px 0;
          color: #111827;
          font-size: 16px;
        ">
          <strong>Amount Attempted:</strong> ${amount}
        </p>

        <p style="
          margin: 10px 0;
          color: #111827;
          font-size: 16px;
        ">
          <strong>Recipient Account:</strong> ${toAccount}
        </p>

        <p style="
          margin: 10px 0;
          color: #dc2626;
          font-size: 16px;
          font-weight: bold;
        ">
          Status: Failed
        </p>

      </div>

      <div style="
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
      ">
        <p style="
          color: #991b1b;
          margin: 0 0 10px 0;
          font-weight: bold;
        ">
          Possible reasons:
        </p>

        <ul style="
          color: #7f1d1d;
          padding-left: 20px;
          line-height: 1.8;
          margin: 0;
        ">
          <li>Insufficient balance</li>
          <li>Invalid recipient account</li>
          <li>Network or server issue</li>
        </ul>
      </div>

      <p style="
        color: #374151;
        font-size: 16px;
        line-height: 1.8;
      ">
        Please review the transaction details and try again.
      </p>

      <p style="
        color: #6b7280;
        font-size: 14px;
        line-height: 1.8;
      ">
        If you continue facing issues or did not attempt this transaction,
        please contact our support team immediately.
      </p>

      <div style="
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 14px;
        text-align: center;
      ">
        © ${new Date().getFullYear()} Wasi B Backend Ledger. All rights reserved.
      </div>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegisterEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
