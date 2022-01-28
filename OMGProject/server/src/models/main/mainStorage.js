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
}
export default MainStorage;
