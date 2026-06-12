import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

/**
 * Portfolio enquiry API.
 *
 * Stores every submission from the site's contact / "Hire Me" form into
 * MongoDB so they show up in MongoDB Compass under:
 *   database:   portfolio
 *   collection: enquiries
 *
 * Connection string and port are read from the environment (see .env.example),
 * defaulting to the local Compass instance on localhost:27017.
 */

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const app = express();
app.use(cors()); // allow the Vite dev server / static site to call this API
app.use(express.json());

/* ------------------------------- Schema -------------------------------- */

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },
    subject: { type: String, trim: true, maxlength: 200, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    // 'hire' when it originated from the Hire Me flow, otherwise a general enquiry.
    type: { type: String, enum: ['enquiry', 'hire'], default: 'enquiry' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

// Model name 'Enquiry' -> Mongoose stores it in the 'enquiries' collection.
const Enquiry = mongoose.model('Enquiry', enquirySchema);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------- Routes -------------------------------- */

// Simple health check — also reports whether the DB is connected.
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Save a new enquiry.
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, email, subject, message, type } = req.body ?? {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ ok: false, error: 'Name, email and message are required.' });
    }
    if (!EMAIL_RE.test(String(email))) {
      return res
        .status(400)
        .json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const doc = await Enquiry.create({
      name,
      email,
      subject: subject || '',
      message,
      type: type === 'hire' ? 'hire' : 'enquiry',
      userAgent: req.get('user-agent') || '',
    });

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error('Failed to save enquiry:', err);
    return res.status(500).json({
      ok: false,
      error: 'Something went wrong while saving your enquiry. Please try again.',
    });
  }
});

// Convenience endpoint to read recent enquiries (handy while testing).
app.get('/api/enquiries', async (_req, res) => {
  try {
    const items = await Enquiry.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json({ ok: true, count: items.length, items });
  } catch (err) {
    console.error('Failed to fetch enquiries:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch enquiries.' });
  }
});

/* ------------------------------- Startup ------------------------------- */

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`\u2713 Connected to MongoDB at ${MONGODB_URI}`);
  } catch (err) {
    console.error('\u2717 MongoDB connection failed:', err.message);
    console.error(
      '  Make sure MongoDB is running (MongoDB Compass / mongod) on localhost:27017.'
    );
    // The server still starts so /api/health reports the problem clearly.
  }

  app.listen(PORT, () => {
    console.log(`\u2713 API server listening on http://localhost:${PORT}`);
    console.log(`  POST http://localhost:${PORT}/api/enquiries  (save an enquiry)`);
    console.log(`  GET  http://localhost:${PORT}/api/health      (status check)`);
  });
}

start();
