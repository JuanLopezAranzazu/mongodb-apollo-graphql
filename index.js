const { gql, ApolloServer, UserInputError } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");
require("./mongo");

/*
const users = [];

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

function validateFields(args) {
  if (
    args.name &&
    users.find((item) => {
      return item.name === args.name;
    })
  ) {
    throw new UserInputError("Name must be unique");
  } else if (
    args.email &&
    users.find((item) => {
      return item.email === args.email;
    })
  ) {
    throw new UserInputError("Email must be unique");
  }
  if (args.phone && !/^\d+$/.test(args.phone)) {
    throw new UserInputError("Incorrect or missing phone");
  }
  if (
    args.position &&
    !["programmer", "fullstack", "tester"].includes(args.position)
  ) {
    throw new UserInputError("Incorrect or missing position");
  }
  return args;
}

const resolvers = {
  Query: {
    findAll: () => {
      return users;
    },
    findById: (parent, args) => {
      return users.find((item) => {
        return item.id === args.id;
      });
    },
  },
  Mutation: {
    create: (parent, args) => {
      const dataForUser = validateFields(args);
      const newUser = { ...dataForUser, id: uuidv4() };
      users.push(newUser);
      return newUser;
    },
    update: (parent, args) => {
      const dataForUser = validateFields(args);
      const userIndex = users.findIndex((item) => {
        return item.id === args.id;
      });
      if (userIndex === -1) return null;
      const keys = Object.keys(dataForUser);
      keys.forEach((item) => {
        users[userIndex][item] = dataForUser[item];
      });
      return users[userIndex];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
*/

const { typeDefs, resolvers } = require("./typeDefs/userType");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server running in url ${url}`);
});
