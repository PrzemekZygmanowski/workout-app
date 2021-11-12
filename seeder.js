const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const env = require("./nodemon.json");

//load models
const Workout = require("./src/models/workout");

//TODO import env from nodemon.json
const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://${env.env.MONGO_USER}:${env.env.MONGO_PASSWORD}@cluster0.jwudy.mongodb.net/test`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
//connect to db
// mongoose.connect(
//   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jwudy.mongodb.net/test`,
//   {
//     useNewUrlParser: true,

//     useUnifiedTopology: true,
//   }
// );
// .then(() => {
//   console.log("dziala".green.bold);
// })
// .catch((err) => {
//   console.log("nie dziala".red.bold);
// });

connectDB();
//read json files
const workouts = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/workouts.json`, "utf-8")
);

//import into db
const importData = async () => {
  try {
    await Workout.create(workouts);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.red);
  }
};

//Delete Data
const deleteData = async () => {
  try {
    await Workout.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.red);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
