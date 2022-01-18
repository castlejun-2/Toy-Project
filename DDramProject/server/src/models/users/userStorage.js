import { pool } from '../../config/database.js';

class UserStorage {
  static verifiedLogIn(email, password) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = 'Select id From User Where email = ? and passwd = ?';
          conn.query(query, [email, password], function (err, rows) {
            if (err) reject(`${err}`);
            if (rows.length) {
              resolve(rows);
            } else {
              resolve({ message: 'Login Failure' });
            }
          });
        }
        conn.release();
      });
    });
  }
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = 'Select id,email From User Where id=?';
          conn.query(query, [id], function (err, rows) {
            if (err) reject(`${err}`);
            if (rows.length) {
              resolve(rows);
            } else {
              resolve({ message: 'Login Failure' });
            }
          });
        }
        conn.release();
      });
    });
  }
}
export default UserStorage;
