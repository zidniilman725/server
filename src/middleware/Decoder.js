const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'Bed6F3Efeq+qQw`m/|aknsEncodeDecode';

export const encrypt = (text) => {
  let cipher = crypto.createCipher(algorithm,password);
  let crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
export const decrypt = (text) =>{
  let decipher = crypto.createDecipher(algorithm,password);
  let dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}