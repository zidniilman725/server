import { gql } from 'apollo-server-express';

const schema = gql`
	type User {
		id: ID!
		name: String!
		username: String!
		password: String!
		email: String!
		image: String!
		isAdminMaster: Boolean!
		isAdmin: Boolean!
	}

	type Query {
		getAllUser: [User!]
		getOneUser(id: ID!): User!
	}

	type Mutation {
		createAdminUser(name: String!, username: String!, email: String!, password: String!): User!
		updateAdminUser(id: ID!, name: String!, username: String!, email: String!): User!
		removeAdminUser(id: ID!): User!
	}

`;

export default schema;