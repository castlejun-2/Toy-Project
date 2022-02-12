import { pool } from '../../config/database.js';

class MeetingStorage {
  static getMeetingInfo(diff_date) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, mainName as mainName, subName as subject, date_format(startTime,"%H:%i") as time, place, case when status=0 then "신청가능" else "모집완료" end as status, case when status=0 then 'isPossible' else 'isDone' end as status_c
            From Meeting
            Where DATE(Meeting.startTime) = (DATE(NOW()) + ?) and if (?, mainName=?, mainName is not null)
            Order By time ASC`;
          conn.query(query, diff_date, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getGameMeetingInfo(diff_date) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, mainName, subName as subject, date_format(startTime,"%H:%i") as time, place, case when status=0 then "신청가능" else "모집완료" end as status
            From Meeting
            Where DATE(Meeting.startTime) = (DATE(NOW()) + ?) and mainName = "game"
            Order By time ASC`;
          conn.query(query, [diff_date], function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getMeedtingDetail(meetingId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select Meeting.id, User.name as userName, User.phoneNumber as phone, User.imageUrl as imageUrl, title, mainName, content, subName as subject, date_format(startTime,"%Y년 %m월 %d일 %a %H:%i") as time, date_format(date_add(startTime, INTERVAL perHour HOUR),"%H:%i") as finishTime, place, placeAddress, placeUrl as p_url, placeLA, placeLO, notice, people, concat(format(fee,0),'원') as fee, concat(perHour,'시간') as perHour, case when status=0 then "신청가능" else "모집완료" end as status, case when status=0 then 'isPossible' else 'isDone' end as status_c
            From Meeting Left Join User On User.id = Meeting.userId
            Where Meeting.id = ?
          `;
          conn.query(query, [meetingId], function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static createMeetingSchedule(meetingParams) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Insert Into Meeting(userId,title,content,mainName,subName,startTime,fee,perHour,place,people,placeAddress,placeLA,placeLO,notice) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);
          `;
          conn.query(query, meetingParams, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static updateMeetingSchedule(meetingParams) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Update Meeting Set userId=?,title=?,content=?,mainName=?,subName=?,startTime=?,fee=?,perHour=?,place=?,people=?,placeAddress=?,placeLA=?,placeLO=?,notice=?) Where id=?;
          `;
          conn.query(query, meetingParams, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static completeMeetingSchedule(meetingId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Update Meeting Set status=1 Where id=?;
          `;
          conn.query(query, meetingId, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static deleteMeetingSchedule(meetingId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Update Meeting Set status=2 Where id=?;
          `;
          conn.query(query, meetingId, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getAllMeetingInfoByUserId(userId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, mainName, subName, place, date_format(startTime, "%Y-%m-%d %H:%i") startTime, people, perHour, status, date_format(createdAt, "%Y-%m-%d") createdAt
            From Meeting  
            Where userId = ? and status != 2
          `;
          conn.query(query, userId, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getMeetingInfoByUserId(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, mainName, subName, place, date_format(startTime, "%Y-%m-%d %H:%i") startTime, people, perHour, status, date_format(createdAt, "%Y-%m-%d") createdAt
            From Meeting  
            Where userId = ? and status != 2
            limit ?, ? ;
          `;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static verfiedMeeting(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = 'Select exists(Select id From Meeting Where userId = ? and id = ?) as exist';
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getMeetingDetailByMeetingId(meetingId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Select id,title,mainName,subName,content,place,placeAddress,notice,people,fee,perHour,status
          From Meeting
          Where id = ?
          `;
          conn.query(query, meetingId, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
}
export default MeetingStorage;
