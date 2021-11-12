const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const env = require("./nodemon.json");

//load models
const Workout = require("./src/models/workout");

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
