import { pool } from '../../config/database.js';

class UserStorage {
  static verfiedEmail(email) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = 'Select id, status From User Where email = ?';
          conn.query(query, email, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static verifiedLogIn(account) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id
            From User
            Where id = ? and passwd = ?`;
          conn.query(query, account, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static createAccount(accountInfo) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Insert into User(email, name, passwd, address, placeLA, placeLO, school, phonenumber)
            VALUES(?,?,?,?,?,?,?,?)`;
          conn.query(query, accountInfo, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
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
          const query =
            'Select id, email, name, imageUrl, address, placeLA, placeLO, school, phonenumber, createdAt, case when certification=0 then null else "인증완료" end as certification From User Where id = ?';
          conn.query(query, id, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getInquiryInfo(userId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, title, date_format(createdAt,"%Y-%m-%d") as createdAt, case when status=0 then '답변대기' else '답변완료' end as status
            From Inquiry
            Where userId = ?
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
  static createAuthToken(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Insert into AuthUser(userId, token, ttl)
            VALUES(?,?,?)`;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static getUserIdByToken(token) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
            Select id, userId, case when DATE_SUB(NOW(),INTERVAL ttl SECOND) > createdAt then 0 else 1 end as valid
            From AuthUser
            Where token = ?`;
          conn.query(query, token, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static settingPasswd(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Update User Set passwd=? Where id=?`;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static updateUserProfileImage(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Update User Set imageUrl=? Where id=?`;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static updateUserPassword(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Update User Set passwd=? Where id=?`;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static updateUserAddress(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Update User Set address=?, placeLA=?, placeLO=? Where id=?`;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static updateUserSchool(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Update User Set school=? Where id=?`;
          conn.query(query, params, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
  static withdrawalUserAccount(userId) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async function (err, conn) {
        if (err) reject(`${err}`);
        else {
          const query = `
          Update User Set status=2 Where id=?`;
          conn.query(query, userId, function (err, rows) {
            if (err) reject(`${err}`);
            else resolve(rows);
          });
        }
        conn.release();
      });
    });
  }
}
export default UserStorage;
