'use strict';
import MeetingStorage from './meetingStorage.js';
import baseResponse from '../../config/responseStatus.js';

class Meeting {
  constructor(body) {
    this.body = body;
  }
  async getScheduleInfo() {
    const scheduleResult = await MeetingStorage.getMeetingInfo(this.body);
    return scheduleResult;
  }
  async createMeeting() {
    try {
      await MeetingStorage.createMeetingSchedule(this.body);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async updateMeeting() {
    try {
      await MeetingStorage.updateMeetingSchedule(this.body);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async completeMeeting() {
    try {
      await MeetingStorage.completeMeetingSchedule(this.body[1]);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async deleteMeeting() {
    try {
      await MeetingStorage.deleteMeetingSchedule(this.body[1]);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async getMyPageMeetingInfo() {
    const myPageMeetingResult = await MeetingStorage.getAllMeetingInfoByUserId(this.body);
    return myPageMeetingResult;
  }
  async getMyMeetingInfo() {
    const myMeetingResult = await MeetingStorage.getMeetingInfoByUserId(this.body);
    return myMeetingResult;
  }
  async certificationMeetingByUserId() {
    const checkResult = await MeetingStorage.verfiedMeeting(this.body);
    if (checkResult) return baseResponse.SUCCESS;
    else return baseResponse.WRONG_APPROACH;
  }
  async getMeetingDetail() {
    const meetingId = this.body[1];
    const meetingDetail = await MeetingStorage.getMeetingDetailByMeetingId(meetingId);
    return meetingDetail;
  }
}
export default Meeting;
