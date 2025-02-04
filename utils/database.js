// // import mongoose from "mongoose";

// // let isConnected = false;

// // export const connectToDB = async () => {
// //   mongoose.set("strictQuery", true);

// //   if (isConnected) {
// //     console.log("MongoDB is already in use!!");
// //     return;
// //   }
// //   try {
// //     await mongoose.connect(process.env.MONGODB_URI, {
// //       dbName: "task management system",
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     isConnected = true;
// //     console.log("MongoDB connected");
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI is missing from environment variables");
// }

// let cached = global.mongoose || { conn: null, promise: null };

// global.mongoose = cached;

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((mongoose) => {
//         console.log("MongoDb Connected !");
//         mongoose;
//       });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  // mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already in use!!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "TaskManagementApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
