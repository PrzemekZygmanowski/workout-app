const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Workout {
    id: ID
    name: String
    workoutType: String
    timerType: String
    description: String
    equipment: String
    time: String
    score: Int
    finishers: [Athlete]
  }

  input WorkoutInput {
    name: String!
    workoutType: String!
    timerType: String!
    description: String!
    equipment: String
    time: String
    score: Int
  }

  input UpdateWorkoutInput {
    name: String
    workoutType: String
    timerType: String
    description: String
    equipment: String
    time: String
    score: Int
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Athlete {
    id: ID!
    login: String!
    password: String!
  }

  input AthleteInput {
    login: String!
    password: String!
  }

  input ScoreInput {
    finishers: FinisherInput
  }

  input FinisherInput {
    login: String!
    time: String
    score: Int
  }

  type Query {
    getAllWorkouts: [Workout]
    getWorkoutById: Workout
    login(login: String!, password: String!): AuthData!
  }

  type Mutation {
    createWorkout(workout: WorkoutInput): Workout
    deleteWorkout(id: ID): String
    updateWorkout(id: ID, workout: UpdateWorkoutInput): Workout
    createAthlete(athlete: AthleteInput): Athlete
    setScore(id: ID, finishers: FinisherInput): Workout
  }
`;

module.exports = typeDefs;
