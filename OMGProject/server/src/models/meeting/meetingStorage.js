import { pool } from '../../config/database.js';

class MeetingStorage {
  static getMeetingInfo(diff_date) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, mainName as mainName, subName as subject, date_format(time,"%H:%i") as time, place, case when status=0 then "신청가능" else "모집완료" end as status, case when status=0 then 'isPossible' else 'isDone' end as status_c
            From Meeting
            Where DATE(Meeting.time) = (DATE(NOW()) + ?) and if (?, mainName=?, mainName is not null)
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
            Select id, title, mainName, subName as subject, date_format(time,"%H:%i") as time, place, case when status=0 then "신청가능" else "모집완료" end as status
            From Meeting
            Where DATE(Meeting.time) = (DATE(NOW()) + ?) and mainName = "game"
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
            Select id, title, mainName, subName as subject, date_format(time,"%H:%i") as time, place, placeUrl as p_url, placeLA, placeLO, case when status=0 then "신청가능" else "모집완료" end as status
            From Meeting
            Where id = ?
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
}
export default MeetingStorage;
