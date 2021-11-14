const Workout = require("./models/workout");
const Athlete = require("./models/athlete");
const bcrypt = require("bcryptjs");
const athlete = require("./models/athlete");

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
    createAthlete: async (parent, args, context, info) => {
      try {
        const existingAthlete = await Athlete.findOne({
          login: args.athlete.login,
        });
        if (existingAthlete) {
          throw new Error("User exists already.");
        }
        const password = await bcrypt.hash(args.athlete.password, 12);

        const athlete = new Athlete({
          login: args.athlete.login,
          password: password,
        });

        await athlete.save();
        return athlete;
      } catch (err) {
        throw err;
      }
    },
    setScore: async (args, req) => {
      // if (!req.isAuth) {
      //   throw new Error("Unauthenticated!");
      // const { id } = args.athlete;

      // }
      try {
        const { id, time, score } = args.athlete;
        const workout = await Workout.findById(args.workout.id);
        // const athlete = await Athlete.findById(args.athlete.id);
        return {
          ...args.workout._doc,
          _id: args.workout.id,
          finishers: athlete.bind(this, athlete._doc.finishers),
        };
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;
