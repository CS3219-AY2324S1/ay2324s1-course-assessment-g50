const mongoose = require('mongoose');

let db;

async function connectToMongoDB() {
  try {
    if (!db) {
      await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
      db = mongoose.connection;
      db.on('error', (error) => console.error(error));
      db.once('open', () => console.log('Connected to MongoDB'));
    }
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = { connectToMongoDB }