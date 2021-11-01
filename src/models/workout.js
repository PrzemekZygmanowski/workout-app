const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  workoutType: {
    type: String,
    required: true,
  },
  timerType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
