import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {IBudgetItem, ITag} from "../../common/models/models";
import {Router} from "express";

export namespace BudgetRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
    router.route("/api/budget")
      .post((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              INSERT INTO Budget
              (AccountId, BudgetName)
              VALUES
              (?, ?)
            `,
            [req.body.accountId, req.body.budgetName],
            (err, result) => {
              if (err) throw err;
              else if (result.insertId) {
                conn.query(`SELECT * FROM Budget WHERE BudgetId = ?`, [result.insertId], (err, result2) => {
                  if (err) throw err;
                  else if (result2[0]) return res.json(result2[0]);
                  else return res.status(500).send("Couldn't retrieve BudgetItem");
                });
              } else res.status(503).send("BudgetItem not added.");
            }
          );
        });
      })
      .put((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              UPDATE  Budget
              SET     AccountId = ?,
                      BudgetName = ?
              WHERE   BudgetId = ?
            `,
            [
              req.body.accountId,
              req.body.budgetName,
              req.body.budgetId
            ],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) {
                conn.query(`SELECT * FROM Budget WHERE BudgetId = ?`, [req.body.budgetId], (err, result2) => {
                  if (err) throw err;
                  else if (result2[0]) return res.json(result2[0]);
                  else res.status(503).send("Budget not found.");
                });
              } else throw Error("Budget not updated");
            }
          );
        });
      });

    router.route("/api/budget/:budgetId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT  *
              FROM    Budget
              WHERE   BudgetId = ?
            `,
            [req.params.budgetId],
            (err, result) => {
              if (err) throw err;
              else if (result[0]) return res.json(result[0]);
              else res.stats(503).send("Budget not found");
            }
          );
        });
      })
      .delete((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              DELETE FROM Budget
              WHERE BudgetId = ?
            `,
            [req.params.budgetId],
            (err, result) => {
              if (err) throw err;
              else if (result.affectedRows === 1) return res.sendStatus(200);
              else return res.status(503).send("Budget not found");
            }
          );
        });
      });

    router.route("/api/budget/:budgetId/items")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT  *
              FROM    BudgetItem
              WHERE   BudgetId = ?
            `,
            [req.params.budgetId],
            (err, result) => {
              if (err) throw err;
              else {
                Promise.all(result.map((budgetItem) => {
                  return new Promise<IBudgetItem>((resolve, reject) => {
                    console.log(budgetItem);
                    console.log(budgetItem.BudgetItemId);
                    conn.query(
                      `
                        SELECT  t.*
                        FROM    Tags as ts
                        JOIN    Tag as t
                        ON      ts.TagId = t.TagId
                        WHERE   ts.BudgetItemId = ?
                      `,
                      [budgetItem.BudgetItemId],
                      (err, result2) => {
                        console.log(result2);
                        if (err) reject(err);
                        else {
                          budgetItem.tags = result2 as Array<ITag>;
                          resolve(budgetItem);
                        }
                      }
                    );
                  });
                }).values()).then((budgetItems) => {
                  return res.json(budgetItems);
                }, (rejected) => { throw rejected; });
              }
            }
          );
        });
      });
    return router;
  }

}