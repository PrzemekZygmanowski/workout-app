const Athlete = require("../models/athlete");
const bcrypt = require("bcryptjs");

const athleteResolvers = {
  Mutation: {
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

        const result = await athlete.save();

        return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = athleteResolvers;
