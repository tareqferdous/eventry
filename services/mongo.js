import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("Connected");
    return conn;
  } catch (err) {
    console.log("getting error..");
    console.log(err);
  }
}
