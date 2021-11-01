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
      const { title, workoutType, timerType, description, equipment, time } =
        args.workout;
      const workout = new Workout({
        title,
        workoutType,
        timerType,
        description,
        equipment,
        time,
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
      const { title, workoutType, timerType, description, equipment, time } =
        args.workout;
      const updates = {};

      ////////Do poprawy!!!!!/////
      if (title !== undefined) {
        updates.title = title;
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

      const workout = await Workout.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return workout;
    },
  },
};

module.exports = resolvers;
