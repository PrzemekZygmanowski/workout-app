const Workout = require("../models/workout");

const workoutResolvers = {
  Query: {
    getAllWorkouts: async () => {
      return await Workout.find();
    },
    getWorkoutById: async (_parent, { id }, _context, _info) => {
      return await Workout.findById(id);
    },
  },
  Mutation: {
    createWorkout: async (parent, args, context, info) => {
      const {
        name,
        workoutType,
        timerType,
        description,
        equipment,
        time,
        score,
      } = args.workout;
      const workout = new Workout({
        name,
        workoutType,
        timerType,
        description,
        equipment,
        time,
        score,
      });
      await workout.save();
      return workout;
    },
    deleteWorkout: async (parent, args, context, info) => {
      const { id } = args;
      await Workout.findByIdAndDelete(id);
      return "Success, workout deleted";
    },
    updateWorkout: async (parent, args, context, info) => {
      const { id } = args;
      const {
        name,
        workoutType,
        timerType,
        description,
        equipment,
        time,
        score,
      } = args.workout;
      const updates = {};

      ////////Do poprawy!!!!!/////
      if (name !== undefined) {
        updates.name = name;
      }
      if (workoutType !== undefined) {
        updates.workoutType = workoutType;
      }
      if (timerType !== undefined) {
        updates.timerType = timerType;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      if (equipment !== undefined) {
        updates.equipment = equipment;
      }
      if (time !== undefined) {
        updates.time = time;
      }
      if (score !== undefined) {
        updates.score = score;
      }

      const workout = await Workout.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return workout;
    },
  },
};

module.exports = workoutResolvers;
