const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Workout {
    id: ID
    title: String
    workoutType: String
    timerType: String
    description: String
    equipment: String
    time: String
  }

  input WorkoutInput {
    title: String!
    workoutType: String!
    timerType: String!
    description: String!
    equipment: String
    time: String
  }

  input UpdateWorkoutInput {
    title: String
    workoutType: String
    timerType: String
    description: String
    equipment: String
    time: String
  }

  type Query {
    getAllWorkouts: [Workout]
    getWorkoutById: Workout
  }

  type Mutation {
    createWorkout(workout: WorkoutInput): Workout
    deleteWorkout(id: ID): String
    updateWorkout(id: ID, workout: UpdateWorkoutInput): Workout
  }
`;

module.exports = typeDefs;
