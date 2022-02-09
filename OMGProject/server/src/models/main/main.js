'use strict';
import MainStorage from './mainStorage.js';
import baseResponse from '../../config/responseStatus.js';

class Main {
  constructor(body) {
    this.body = body;
  }
  async createInquiry() {
    try {
      await MainStorage.createInquiry(this.body);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
}
export default Main;
