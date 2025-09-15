const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB schema
const donationSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// Webhook endpoint for Paystack
app.post('/webhook', async (req, res) => {
  const event = req.body;

  if (event.event === 'charge.success') {
    const amountInNaira = event.data.amount / 100;
    const category = event.data.metadata.category || 'general';

    const donation = new Donation({ amount: amountInNaira, category });

    try {
      await donation.save();
      console.log(Donation saved: ₦${amountInNaira} for ${category});
      res.sendStatus(200);
    } catch (err) {
      console.error('Error saving donation:', err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(200);
  }
});

// API to get total donations by category
app.get('/total-donations', async (req, res) => {
  const category = req.query.category;
  const filter = category ? { category } : {};
n
  try {
    const donations = await Donation.find(filter);
    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

    res.json({ totalAmount });
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(Server running on port ${port});
});
