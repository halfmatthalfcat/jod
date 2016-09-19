import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";

export namespace AccountRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
    router.route("/api/account")
      .post((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              INSERT INTO Account
              (UserId, AccountName)
              VALUES
              (?, ?)
            `,
            [req.body.userId, req.body.accountName],
            (err, result) => {
              if (err) throw err;
              else if (result.insertId) {
                conn.query(`SELECT * FROM Account WHERE AccountId = ?`, [result.insertId], (err, result2) => {
                  if (err) throw err;
                  else if (result2[0]) return res.json(result2[0]);
                  else return res.status(500).send("Account not added.");
                });
              } else throw Error("Account not added.");
            }
          );
        });
      })
      .put((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              UPDATE  Account
              SET     UserId = ?,
                      AccountName = ?
              WHERE   AccountId = ?
            `,
            [
              req.body.userId,
              req.body.accountName,
              req.body.accountId
            ],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) {
                conn.query(`SELECT * FROM Account WHERE AccountId = ?`, [req.body.accountId], (err, result2) => {
                  if (err) throw err;
                  else if (result2[0]) return res.json(result2[0]);
                  else return res.status(500).send("Account not found");
                });
              } else throw Error("Account not updated");
            }
          );
        });
      });

    router.route("/api/account/all")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT  *
              FROM    Account as a
              JOIN    User as u
              ON      a.UserId = u.UserId
              WHERE   a.Active = 1 AND
                      u.Active = 1
            `,
            (err, result) => {
              if (err) throw err;
              else return res.json(result);
            }
          );
        });
      });

    router.route("/api/account/:accountId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT  *
              FROM    Account
              WHERE   AccountId = ?
            `,
            [req.params.accountId],
            (err, result) => {
              if (err) throw err;
              else if (result[0]) return res.json(result[0]);
              else return res.status(500).send("Account not found");
            }
          );
        });
      })
      .delete((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              UPDATE  Account
              SET     Active = 0
              WHERE   AccountId = ?
            `,
            [req.params.accountId],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) return res.sendStatus(200);
              else return res.status(500).send("Account not found");
            }
          );
        });
      });

    router.route("/api/account/:accountId/budgets")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT  *
              FROM    Budget
              WHERE   AccountId = ? AND
                      Active = 1
            `,
            [req.params.accountId],
            (err, result) => {
              if (err) throw err;
              else return res.json(result);
            }
          );
        });
      });
    return router;
  }
}