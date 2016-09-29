import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";

export namespace BudgetItemRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
      router.route("/api/budget/item")
        .post((req, res) => {
          connection(db, res, (conn) => {
            return conn.query(
              `
                INSERT INTO BudgetItem
                (BudgetId, Description, Created, TotalPrice, Notes)
                VALUES
                (?, ?, ?, ?, ?)
              `,
              [
                req.body.budgetId,
                req.body.description,
                req.body.created,
                req.body.totalPrice,
                req.body.notes
              ],
              (err, result) => {
                if (err) res.status(500).send(err);
                else if (result.insertId) {
                  if(req.body.tags && req.body.tags.length > 0) {
                    Promise.all(req.body.tags.map((tag) => {
                      new Promise((resolve, reject) => {
                        conn.query(
                          `
                            INSERT INTO TagMap
                            (BudgetItemId, TagId)
                            VALUES
                            (?, ?)
                          `,
                          [result.insertId, tag.tagId],
                          (err, result2) => {
                            if (err) reject(err);
                            else resolve();
                          }
                        )
                      })
                    })).then(() => {
                      conn.query(`SELECT * FROM BudgetItem WHERE BudgetItemId = ?`, [result.insertId], (err, result2) => {
                        if (err) res.status(500).send(err);
                        else if (result2[0]) return res.json(result2[0]);
                        else return res.status(500).send("Couldn't retrieve BudgetItem");
                      });
                    }, () => { res.status(500).send("Error adding tags to new BudgetItem"); });
                  } else {
                    conn.query(`SELECT * FROM BudgetItem WHERE BudgetItemId = ?`, [result.insertId], (err, result2) => {
                      if (err) res.status(500).send(err);
                      else if (result2[0]) return res.json(result2[0]);
                      else return res.status(500).send("Couldn't retrieve BudgetItem");
                    });
                  }
                } else return res.status(500).send("BudgetItem not added.");
              }
            );
          });
        })
        .put((req, res) => {
          connection(db, res, (conn) => {
            return conn.query(
              `
                UPDATE  BudgetItem
                SET     Description = ?,
                        TotalPrice = ?,
                        Created = ?,
                        Invoiced = ?,
                        Notes = ?
                WHERE   BudgetItemId = ?
              `,
              [
                req.body.description,
                req.body.totalPrice,
                req.body.created,
                req.body.invoiced,
                req.body.notes,
                req.body.budgetItemId
              ],
              (err, result) => {
                if (err) res.status(500).send(err);
                else if (result.affectedRows === 1) {
                  conn.query(`SELECT * FROM BudgetItem WHERE BudgetItemId = ?`, [req.body.budgetItemId], (err, result2) => {
                    if (err) res.status(500).send(err);
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("Couldn't retrieve BudgetItem");
                  });
                } else return res.status(500).send("BudgetItem not updated.");
              }
            );
          });
        });

      router.route("/api/budget/item/:budgetItemId")
        .get((req, res) => {
          connection(db, res, (conn) => {
            return conn.query(
              `
                SELECT    *
                FROM      BudgetItem
                WHERE     BudgetItemId = ?
              `,
              [req.params.budgetItemId],
              (err, result) => {
                if (err) res.status(500).send(err);
                else if (result[0]) return res.json(result[0]);
                else return res.status(500).send("BudgetItem not found.");
              }
            );
          });
        })
        .delete((req, res) => {
          connection(db, res, (conn) => {
            return conn.query(
              `
                DELETE FROM BudgetItem
                WHERE BudgetItemId = ?
              `,
              [req.params.budgetItemId],
              (err, result) => {
                if (err) res.status(500).send(err);
                else if (result.affectedRows === 1) return res.sendStatus(201);
                else return res.status(500).send("BudgetItem not found.");
              }
            );
          });
        });

      router.route("/api/budget/item/:budgetItemId/tag/:tagId")
        .post((req, res) => {
          connection(db, res, (conn) => {
            return conn.query(
              `
                INSERT INTO TagMap
                (BudgetItemId, TagId)
                VALUES
                (?, ?)
              `,
              [req.params.budgetItemId, req.params.tagId],
              (err, result) => {
                if (err) res.status(500).send(err);
                else return res.json({});
              }
            );
          });
        })
        .delete((req, res) => {
          connection(db, res, (conn) => {
            return conn.query(
              `
                DELETE FROM TagMap
                WHERE BudgetItemId = ? AND
                      TagId = ?
              `,
              [req.params.budgetItemId, req.params.tagId],
              (err, result) => {
                if (err) res.status(500).send(err);
                else if (result.affectedRows === 1) return res.sendStatus(200);
                else return res.status(500).send("Tag/BudgetItem not found");
              }
            );
          });
        });

    return router;
  }
}