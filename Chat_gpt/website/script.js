$('#heroCarousel').carousel({
    interval: 5000, // Change slide every 5 seconds
    ride: 'carousel'
});

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the form (static files)
app.use(express.static('public')); // Assuming your HTML file is in the 'public' folder

// Route to handle form submission
app.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Setup nodemailer transporter for email sending (configure with your email service)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'receiver-email@gmail.com', // Replace with your receiving email
    subject: `New Contact Form Message: ${subject}`,
    text: `You received a message from ${name} (${email}):\n\n${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error occurred: ' + error.message);
    }
    res.status(200).send('Message Sent: ' + info.response);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
