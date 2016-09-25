import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";


export namespace UserInfoRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
    router.route("/api/user/info")
      .post((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              INSERT INTO UserInfo
              (
                UserId,
                FirstName,
                LastName,
                Phone, 
                Address1, 
                Address2, 
                City, 
                State, 
                ZipCode
              )
              VALUES
              (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              req.body.userId,
              req.body.firstName,
              req.body.lastName,
              req.body.phone,
              req.body.address1,
              req.body.address2,
              req.body.city,
              req.body.state,
              req.body.zipCode
            ],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) {
                conn.query(`SELECT * FROM UserInfo WHERE UserId = ?`, [req.body.userId], (err, result2) => {
                  if (err) throw err;
                  else if (result2[0]) return res.json(result2[0]);
                  else return res.status(500).send("UserInfo not added");
                });
              } else throw Error("UserInfo not added");
            }
          );
        });
      })
      .put((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              INSERT INTO UserInfo
              (
                UserId,
                FirstName,
                LastName,
                Address1,
                Address2,
                City,
                State,
                ZipCode,
                Phone
              )
              VALUES
              (?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE
                FirstName = ?,
                LastName = ?,
                Address1 = ?,
                Address2 = ?,
                City = ?,
                State = ?,
                ZipCode = ?,
                Phone = ?
            `,
            [
              req.body.userId,
              req.body.firstName,
              req.body.lastName,
              req.body.address1 || null,
              req.body.address2 || null,
              req.body.city || null,
              req.body.state || null,
              req.body.zipCode || null,
              req.body.phone || null,
              req.body.firstName,
              req.body.lastName,
              req.body.address1 || null,
              req.body.address2 || null,
              req.body.city || null,
              req.body.state || null,
              req.body.zipCode || null,
              req.body.phone || null
            ],
            (err, result) => {
              console.log(result);
              if (err) throw err;
              else if (result.affectedRows > 0) {
                conn.query(`SELECT * FROM UserInfo WHERE UserId = ?`, [req.body.userId], (err, result2) => {
                  console.log(result2);
                  if (err) throw err;
                  else if (result2[0]) return res.json(result2[0]);
                  else return res.status(500).send("UserInfo not updated");
                });
              }
            }
          );
        });
      });

    router.route("/api/user/:userId/info")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT  *
              FROM    UserInfo
              WHERE   UserId = ?
            `,
            [req.params.userId],
            (err, result) => {
              if (err) throw err;
              else if (result[0]) return res.json(result[0]);
              else return res.status(500).send("User does not exist.");
            }
          );
        });
      })
      .delete((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              DELETE FROM UserInfo
              WHERE UserId = ?
            `,
            [req.params.userId],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) return res.sendStatus(200);
              else res.status(500).send("User does not exist.");
            }
          );
        });
      });
    return router;
  }
}