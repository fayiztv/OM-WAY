import mongoose from 'mongoose';

async function dbConnect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1/onmyway');
    console.log('Database connected');
  } catch (err) {
    console.error('Database error:\n', err);
  }
}

export default dbConnect;
