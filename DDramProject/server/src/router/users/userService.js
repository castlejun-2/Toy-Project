'use strict';
import User from '../../models/users/user.js';
import UserStorage from '../../models/users/userStorage.js';
import crypto from 'crypto';

class UserService {
  checkUser = async function (email, password) {
    try {
      const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
      const user = new User({ email, hashedPassword });
      const result = user.login(email, hashedPassword);
      return result;
    } catch (err) {}
  };
}

export default new UserService();
