'use strict';
import userStorage from './userStorage.js';

class User {
  constructor(body) {
    this.body = body;
  }
  async login(email, password) {
    try {
      return this.body;
    } catch (err) {
      console.log(err);
    }
  }
}
export default User;
