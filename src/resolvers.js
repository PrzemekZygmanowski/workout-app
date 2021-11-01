const Workout = require("./models/workout");

const resolvers = {
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
      const { title, workoutType, timerType, description } = args.workout;
      const workout = new Workout({
        title,
        workoutType,
        timerType,
        description,
      });
      await workout.save();
      return workout;
    },
  },
};

module.exports = resolvers;
