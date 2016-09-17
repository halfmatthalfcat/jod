import {connection} from '../util/helpers';

import {IPool} from "mysql";
var express = require('express');

export module UserInfoRoutes {
  var router = express.Router();

  export default function routes(
    db: IPool
  ) {
    router.route("/api/user/info")
      .post((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              INSERT INTO UserInfo
              (
                UserId,
                Phone, 
                Address1, 
                Address2, 
                City, 
                State, 
                ZipCode
              )
              VALUES
              (?, ?, ?, ?, ?, ?, ?)
            `,
            [
              req.body.userId,
              req.body.phone,
              req.body.address1,
              req.body.address2,
              req.body.city,
              req.body.state,
              req.body.zipCode
            ],
            (err, result) => {
              if(err) throw err;
              else if(result.resultId) {
                conn.query(`SELECT * FROM UserInfo WHERE UserId = ?`, [result.resultId], (err, result2) => {
                  if(result2[0]) return res.json(result2[0]);
                  else return res.status(503).send("UserInfo not added");
                });
              } else throw Error("UserInfo not added");
            }
          )
        })
      })
      .put((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              UPDATE  UserInfo
              SET     Phone = ?,
                      Address1 = ?,
                      Address2 = ?,
                      City = ?,
                      State = ?,
                      ZipCode = ?
              WHERE   UserId = ?
            `,
            [
              req.body.phone,
              req.body.address1,
              req.body.address2,
              req.body.city,
              req.body.state,
              req.body.zipCode,
              req.body.userId
            ],
            (err, result) => {
              if(err) throw err;
              else if(result.affectedRows == 1) {
                conn.query(`SELECT * FROM UserInfo WHERE UserId = ?`, [req.body.userId], (err, result2) => {
                  if(err) throw err;
                  else if(result2[0]) return res.json(result2[0]);
                  else return res.status(503).send("UserInfo not updated");
                });
              }
            }
          )
        });
      });

    router.route("/api/user/:userId/info")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              SELECT  *
              FROM    UserInfo
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
              DELETE FROM UserInfo
              WHERE UserId = ?
            `,
            [req.params.userId],
            (err, result) => {
              if(err) throw err;
              else if(result.affectedRows == 1) return res.sendStatus(201);
              else res.status(503).send("User does not exist.");
            }
          );
        });
      });
  }
}