'use strict';
import InquiryStorage from './inquiryStorage.js';
import baseResponse from '../../config/responseStatus.js';

class Inquiry {
  constructor(body) {
    this.body = body;
  }
  async getInquiryDetail() {
    try {
      const params = [this.body.userId, this.body.inquiryId];
      const inquiryDetail = await InquiryStorage.getInquiryDetail(params);
      return inquiryDetail[0];
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async getInquiryAnswer() {
    try {
      const inquiryAnswer = await InquiryStorage.getInquiryAnswer(this.body.inquiryId);
      return inquiryAnswer[0];
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
}
export default Inquiry;
