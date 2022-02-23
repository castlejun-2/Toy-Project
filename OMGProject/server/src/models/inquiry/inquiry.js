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
      let defaultInquiry = { answer: '답변대기', createdAt: '답변대기' };
      const inquiryAnswer = await InquiryStorage.getInquiryAnswer(this.body.inquiryId);
      if (inquiryAnswer[0]) return inquiryAnswer[0];
      else return defaultInquiry;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
}
export default Inquiry;
