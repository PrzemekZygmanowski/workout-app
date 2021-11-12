const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AthleteSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  finishedWorkouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
});

module.exports = mongoose.model("Athlete", AthleteSchema);
