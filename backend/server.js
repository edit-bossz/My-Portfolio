require('dotenv').config();
const imap = require('imap-simple');
const moment = require('moment');
const mongoose = require('mongoose');

// MongoDB Model
const EmailSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    time: { type: String, required: true },
  },
  { collection: 'visitors' } // Explicitly specify the collection name
);
const Email = mongoose.model('Email', EmailSchema);

// IMAP Configuration
const config = {
  imap: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Fetch and Parse Emails
async function fetchEmails() {
  const connection = await imap.connect(config);

  try {
    await connection.openBox('IPs'); // Open the 'IPs' label

    const searchCriteria = ['ALL'];
    const fetchOptions = { bodies: ['HEADER.FIELDS (DATE FROM)', 'TEXT'], struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const message of messages) {
      const headers = message.parts.find((part) => part.which === 'HEADER.FIELDS (DATE FROM)').body;
      const body = message.parts.find((part) => part.which === 'TEXT').body;

      const date = headers.date[0];
      const time = moment(new Date(date)).toISOString(); // Convert to ISO format
      const ipMatch = body.match(/Visitor's IP Address: ([\d.]+)/);

      if (ipMatch) {
        const ip = ipMatch[1];

        // Check if the IP and time already exist in MongoDB
        const exists = await Email.findOne({ ip, time });
        if (!exists) {
          const emailData = new Email({ ip, time });
          await emailData.save();
          console.log(`Saved to MongoDB: ${JSON.stringify(emailData)}`);
        } else {
          console.log(`Skipping duplicate: IP ${ip}, Time ${time}`);
        }
      }
    }

    connection.end();
    console.log('Emails processed successfully.');
    console.log('Stopping the script.');
    process.exit(0); // Stop the script
  } catch (err) {
    console.error('Error processing emails:', err);
    process.exit(1); // Exit with an error code
  }
}

// Run the fetchEmails function
fetchEmails().catch((err) => {
  console.error('Error:', err);
  process.exit(1); // Exit on any uncaught errors
});
