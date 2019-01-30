import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import schema from './schema';
import { ifExistUser, isOnline } from '../middleware/AuthValidate';

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  // context: async ({ req }) => {
  //   const header = req.headers.authorization || '';
    
  //   const currentUser = await ifExistUser(header);
  //   return {
  //     user: currentUser
  //   }
    
  // },
  // subscriptions: {
  //   onConnect: async (connectionParams, webSocket) => {
  //     if (connectionParams.authToken) {
  //       await isOnline(connectionParams.authToken);
  //       return;
  //     }

  //     throw new Error('Missing auth token!');
  //   },
  //   onDisconnect: async (webSocket, context) => {
      
  //   },
  // },
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
});