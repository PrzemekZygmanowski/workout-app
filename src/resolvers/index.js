const workoutResolvers = require("../resolvers");
const athleteResolvers = require("./athlete");

const rootResolver = {
  ...workoutResolvers,
  ...athleteResolvers,
};

module.exports = rootResolver;
