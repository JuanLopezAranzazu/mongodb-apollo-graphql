const { gql, UserInputError } = require("apollo-server");
// models
const User = require("./../models/userModel");

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    phone: String
    position: String
    id: ID!
  }

  type Query {
    findAll: [User]
    findById(id: ID!): User
  }

  type Mutation {
    create(
      name: String!
      email: String!
      phone: String
      position: String
    ): User!
    update(
      id: String!
      name: String
      email: String
      phone: String
      position: String
    ): User!
  }
`;

const resolvers = {
  Query: {
    findAll: async () => {
      const users = await User.find({});
      return users;
    },
    findById: async (parent, args) => {
      const user = await User.findById(args.id);
      return user;
    },
  },
  Mutation: {
    create: async (parent, args) => {
      const newUser = new User({ ...args });
      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return newUser;
    },
    update: async (parent, args) => {
      let updatedUser = await User.findById(args.id);
      try {
        updatedUser = await User.findByIdAndUpdate(
          args.id,
          { ...args },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return updatedUser;
    },
  },
};

module.exports = { typeDefs, resolvers };
