import mongoose from 'mongoose';

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log('Database connected');
  } catch (err) {
    console.error('Database error:\n', err);
  }
}

export default dbConnect;
