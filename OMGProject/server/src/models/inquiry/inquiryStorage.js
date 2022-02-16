import { pool } from '../../config/database.js';

class InquiryStorage {
  static getInquiryDetail(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select title, content, date_format(createdAt, "%Y-%m-%d") as createdAt, case when status=0 then '답변대기' else '답변완료' end as status
            From Inquiry
            Where userId = ? and id = ?
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
  static getInquiryAnswer(inquiryId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
              Select answer, date_format(createdAt,"%Y-%m-%d %H:%i") as createdAt
              From InquiryAnswer
              Where inquiryId = ?
            `;
          conn.query(query, inquiryId, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
}
export default InquiryStorage;
