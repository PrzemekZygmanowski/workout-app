const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Workout {
    id: ID
    title: String
    workoutType: String
    timerType: String
    description: String
    time: String
  }

  input WorkoutInput {
    title: String!
    workoutType: String!
    timerType: String!
    description: String!
    time: String
  }

  type Query {
    getAllWorkouts: [Workout]
    getWorkoutById: Workout
    getWorkoutByTitle: Workout
  }

  type Mutation {
    createWorkout(workout: WorkoutInput): Workout
  }
`;

module.exports = typeDefs;
