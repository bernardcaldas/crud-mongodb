
  
import mongoose, { ConnectOptions } from 'mongoose';
//import 'dotenv/config';

const connection = {};

async function dbConnect() {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(`${process.env.NEXT_PUBLIC_MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          ` Database connection error occured `,
          err
        );
      });
  }
}

export default dbConnect;