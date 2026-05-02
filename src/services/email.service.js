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


// async function sendRegisterEmail(userEmail, name) {
//   const subject = "A Tiny Love Letter Just for You ❤️";

//   const text = `
// Hello ${name},

// Just wanted to remind you something today...

// You are the best thing that has ever happened to me. ❤️

// No matter how busy life gets, every moment with you still feels special, warm, and safe.
// Thank you for existing, for loving me, and for making my world beautiful.

// If I could code one perfect thing in life,
// it would still be us.

// Forever yours,
// Wasi ❤️
//   `;

//   const html = `
//   <div style="
//     font-family: Arial, sans-serif;
//     background: linear-gradient(135deg, #ffdde1, #ee9ca7);
//     padding: 40px;
//     border-radius: 20px;
//     color: #ffffff;
//     text-align: center;
//   ">
    
//     <img 
//       src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif" 
//       alt="Cute Love"
//       style="
//         width: 180px;
//         border-radius: 15px;
//         margin-bottom: 20px;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//       "
//     />

//     <h1 style="
//       font-size: 36px;
//       margin-bottom: 10px;
//     ">
//       Hey ${name} ❤️
//     </h1>

//     <p style="
//       font-size: 18px;
//       line-height: 1.8;
//       max-width: 600px;
//       margin: auto;
//     ">
//       Just wanted to remind you something today...
//       <br/><br/>
//       You are the <b>best thing</b> that has ever happened to me. ✨
//       <br/><br/>
//       No matter how busy life gets, every moment with you still feels warm, peaceful, and special.
//       <br/><br/>
//       Thank you for existing.
//       <br/>
//       Thank you for loving me.
//       <br/>
//       Thank you for making my world beautiful. 🌸
//       <br/><br/>
//       If I could code one perfect thing in life...
//       <br/>
//       it would still be <b>us</b>. ❤️
//     </p>

//     <div style="
//       margin-top: 30px;
//       font-size: 24px;
//     ">
//       💖 🌹 🥰 💕
//     </div>

//     <p style="
//       margin-top: 35px;
//       font-size: 16px;
//       opacity: 0.9;
//     ">
//       Forever yours,<br/>
//       <b>Wasi ❤️</b>
//     </p>
//   </div>
//   `;

//   await sendEmail(userEmail, subject, text, html);
// }

module.exports = { sendRegisterEmail };
