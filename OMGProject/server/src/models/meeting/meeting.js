'use strict';
import MeetingStorage from './meetingStorage.js';
import baseResponse from '../../config/responseStatus.js';

class Meeting {
  constructor(body) {
    this.body = body;
  }
  async getScheduleInfo() {
    const params = [this.body.diff_date, this.body.typeStatus, this.body.type];
    const scheduleResult = await MeetingStorage.getMeetingInfo(params);
    return scheduleResult;
  }
  async getScheduleInfoByFilter() {
    let scheduleResult;
    if (this.body.status) {
      const params = [
        this.body.diff_date,
        this.body.typeParams,
        this.body.type,
        this.body.area,
        this.body.status,
        this.body.search,
        this.body.search,
      ];
      scheduleResult = await MeetingStorage.getMeetingInfoByFilter(params);
    } else {
      const params = [this.body.diff_date, this.body.typeParams, this.body.type, this.body.area, this.body.search, this.body.search];
      scheduleResult = await MeetingStorage.getMeetingInfoByFilterAll(params);
    }
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
      const meetingId = this.body.meetingId;
      await MeetingStorage.completeMeetingSchedule(meetingId);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async deleteMeeting() {
    try {
      const meetingId = this.body.meetingId;
      await MeetingStorage.deleteMeetingSchedule(meetingId);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async getMyPageMeetingInfo() {
    const userId = this.body.userId;
    const myPageMeetingResult = await MeetingStorage.getAllMeetingInfoByUserId(userId);
    return myPageMeetingResult;
  }
  async getMyMeetingInfo() {
    const myMeetingResult = await MeetingStorage.getMeetingInfoByUserId(this.body);
    return myMeetingResult;
  }
  async certificationMeetingByUserId() {
    const params = [this.body.userId, this.body.meetingId];
    const checkResult = await MeetingStorage.verfiedMeeting(params);
    if (checkResult) return baseResponse.SUCCESS;
    else return baseResponse.WRONG_APPROACH;
  }
  async getMeetingDetail() {
    const meetingId = this.body.meetingId;
    const meetingDetail = await MeetingStorage.getMeetingDetailByMeetingId(meetingId);
    return meetingDetail;
  }
}
export default Meeting;
