import {connection} from '../util/helpers';

import {IPool} from "mysql";
var express = require('express');

export module UserRoutes {
  var router = express.Router();

  export default function routes(
    db: IPool
  ) {
    router.route("/api/user")
      .post((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
                INSERT INTO User
                (Email, Username)
                VALUES
                (?, ?)
              `,
            [req.body.email, req.body.username],
            (err, result) => {
              if(err) throw err;
              else if(result.resultId) {
                conn.query(
                  `SELECT * FROM User WHERE UserId = ?`, [rows.resultId], (err, result2) => {
                    if (result2[0]) return res.json(result2[0]);
                    else return res.status(503).send("User not added.");
                  }
                );
              } else throw Error("User not added");
            }
          );
        });
      })
      .put((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              UPDATE  User
              SET     Email = ?,
                      Username = ?
              WHERE   UserId = ?
            `,
            [req.body.email, req.body.username, req.body.userId],
            (err, result) => {
              if(err) throw err;
              else if(result.affectedRows == 1) {
                conn.query(
                  `SELECT * FROM User WHERE UserId = ?`, [req.body.userId], (err, result2) => {
                    if(result2[0]) return res.json(result2[0]);
                    else return res.status(503).send("User not added.");
                  }
                )
              } else throw Error("User not updated");
            }
          );
        });
      });

    router.route("/api/user/:userId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              SELECT  *
              FROM    User
              WHERE   UserId = ?
            `,
            [req.params.userId],
            (err, result) => {
              if(err) throw err;
              else if(result[0]) return res.json(result[0]);
              else return res.status(503).send("User does not exist.");
            }
          );
        });
      })
      .delete((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              DELETE FROM User
              WHERE UserId = ?
            `,
            [req.params.userId],
            (err, result) => {
              if(err) throw err;
              else if(result.affectedRows == 1) return res.sendStatus(201);
              else return res.status(503).send("User does not exist.");
            }
          );
        });
      });

    router.route("/api/user/all")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              SELECT * FROM User
            `,
            (err, result) => {
              if(err) throw err;
              else return res.json(result[0]);
            }
          );
        });
      });
  }
}