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
}
export default Meeting;
