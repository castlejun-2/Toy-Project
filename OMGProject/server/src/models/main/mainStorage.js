import { pool } from '../../config/database.js';

class MainStorage {
  static getEventInfo() {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, bannerUrl as b_url, posterUrl as p_url
            From Event
            Where status = 1`;
          conn.query(query, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getNoticeInfo() {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, content, date_format(createdAt,"%Y-%m-%d") as createdAt, type
            From Notice
            Where status = 0`;
          conn.query(query, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getQuestionInfo() {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, content
            From Question
            Where status = 0`;
          conn.query(query, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getCompetitionInfo() {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, content, date_format(createdAt,"%Y-%m-%d") as createdAt, organizer, case when status=0 then "신청가능" when status=1 then "신청종료" when status=2 then "대회종료" end as status
            From Competition
            Where status = 0`;
          conn.query(query, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static createInquiry(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Insert Into Inquiry(userId, title, content) Values(?,?,?)`;
          conn.query(query, params, function (err, rows) {
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
