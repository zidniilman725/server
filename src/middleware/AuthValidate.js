import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { decrypt } from './Decoder';
import User from '../models/Users';

// validate user token
const validateToken = token => {
    const authToken = decrypt(token);
    jwt.verify(authToken, process.env.SECRETOURTOKENS, (err, decode) => {
      if(err){
         throw new AuthenticationError('Invalid credential');
      } else {
         return { email: decode.email};
      }
    });
};


// get user by headers
export const ifExistUser = async (header) => {
  let token;

  if(!header) {
    throw new AuthenticationError('You must log in');
  }
  
  if(header) token = header.split(' ')[1];
  
  const validate = await validateToken(token);
  const user = await User.findOne({validate}).exec();
  return user;
}

export const isOnline = async (header) => {
    const user = await ifExistUser(header);
    await User.findByIdAndUpdate(user.id, {
      isOnline: true
    }, {new: true}).exec();

    return {online: user.isOnline};
};

export const isOffline = async (user) => {
    const offline = await User.findByIdAndUpdate(user, {
      isOnline: false
    }, {new: true}).exec();

    return offline;
};
