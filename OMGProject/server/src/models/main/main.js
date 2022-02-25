'use strict';
import MainStorage from './mainStorage.js';
import baseResponse from '../../config/responseStatus.js';

class Main {
  constructor(body) {
    this.body = body;
  }
  async createInquiry() {
    try {
      const params = [this.body.userId, this.body.title, this.body.content];
      await MainStorage.createInquiry(params);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
}
export default Main;
