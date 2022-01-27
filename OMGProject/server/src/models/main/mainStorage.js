import { pool } from '../../config/database.js';

class MainStorage {
  static getEventInfo() {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = 'Select id, bannerUrl as b_url, posterUrl as p_url From Event Where status = 1';
          conn.query(query, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getMeetingInfo() {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `Select id, title, type, date_format(time,"%H:%i") as time, place, case when status=0 then "신청가능" else "모집완료" end as status
            From Meeting
            Where DATE(Meeting.time) = DATE(NOW())
            Order By time ASC`;
          conn.query(query, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
}
export default MainStorage;
