const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workoutType: {
    type: String,
    enum: ["Bodyweight", "Mixed", "Running", "Barbell"],
    required: true,
  },
  timerType: {
    type: String,
    enum: ["EMOM", "AMRAP", "For Time", "For Quality"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
  },
  time: {
    type: String,
  },
  score: {
    type: Number,
  },
  finisher: [
    {
      type: Schema.Types.ObjectId,
      ref: "Athlete",
    },
  ],
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
