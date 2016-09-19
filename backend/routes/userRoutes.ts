import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";
import {UserInfo} from "../../common/models/userInfo";
import {FullUser} from "../../common/models/fullUser";

export namespace UserRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
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
              if (err) throw err;
              else if (result.insertId) {
                conn.query(
                  `SELECT * FROM User WHERE UserId = ?`, [result.insertId], (err, result2) => {
                    if (err) throw err;
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("User not added.");
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
              if (err) throw err;
              else if (result.affectedRows === 1) {
                conn.query(
                  `SELECT * FROM User WHERE UserId = ?`, [req.body.userId], (err, result2) => {
                    if (err) throw err;
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("User not added.");
                  }
                );
              } else throw Error("User not updated");
            }
          );
        });
      });

    router.route("/api/user/all")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              SELECT * FROM User WHERE Active = 1
            `,
            (err, result) => {
              if (err) throw err;
              else return res.json(result);
            }
          );
        });
      });

    router.route("/api/user/all/full")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(`SELECT * FROM User WHERE Active = 1`, (err, result) => {
            if (err) throw err;
            else Promise.all(result.map((user) => {
              return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM UserInfo WHERE UserId = ?`, [user.userId], (err, result2) => {
                  if (err) throw err;
                  else if (result2[0]) resolve({ user: user, userInfo: result2[0] as UserInfo } as FullUser);
                  else resolve({ user: user, userInfo: {} as UserInfo} as FullUser);
                });
              });
            })).then((fullUsers) => {
              res.json(fullUsers);
            }).catch((reject) => {
              res.status(500).send("Unable get all full users.");
            });
          });
        });
      });

    router.route("/api/user/:userId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              SELECT  *
              FROM    User
              WHERE   Active = 1 AND
                      UserId = ?
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
          conn.query(
            `
              UPDATE  User
              SET     Active = 0
              WHERE   UserId = ?
            `,
            [req.params.userId],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) return res.sendStatus(200);
              else return res.status(500).send("User does not exist.");
            }
          );
        });
      });
    return router;
  }
}