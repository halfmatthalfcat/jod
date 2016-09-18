import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";

export namespace TagRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
      router.route("/api/tag")
        .post((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                INSERT INTO Tag
                (TagName, TagColor)
                VALUES
                (?, ?)
              `,
              [req.body.tagName, req.body.tagColor],
              (err, result) => {
                if (err) throw err;
                else if (result.insertId) {
                  conn.query(`SELECT * FROM Tag WHERE TagId = ?`, [result.insertId], (err, result2) => {
                    if (err) throw err;
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("Couldn't retrieve Tag.");
                  });
                } else return res.status(500).send("Couldn't add Tag.");
              }
            );
          });
        })
        .put((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                UPDATE  Tag
                SET     TagName = ?,
                        TagColor = ?
                WHERE   TagId = ?
              `,
              [
                req.body.tagName,
                req.body.tagColor,
                req.body.tagId
              ],
              (err, result) => {
                if (err) throw err;
                else if (result.affectedRows === 1) {
                  conn.query(`SELECT * FROM Tag WHERE TagId = ?`, [req.body.tagId], (err, result2) => {
                    if (err) throw err;
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("Couldn't retrieve Tag.");
                  });
                } else return res.status(500).send("Couldn't update Tag.");
              }
            );
          });
        });

      router.route("/api/tag/all")
        .get((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                SELECT  *
                FROM    Tag
              `,
              (err, result) => {
                if (err) throw err;
                else return res.json(result);
              }
            );
          });
        });

      router.route("/api/tag/:tagId")
        .get((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `SELECT * FROM Tag WHERE TagId = ?`, [req.params.tagId], (err, result) => {
                if (err) throw err;
                else if (result[0]) return res.json(result[0]);
                else return res.status(500).send("Tag not found.");
              });
          });
        })
        .delete((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                DELETE FROM Tag
                WHERE TagId = ?
              `,
              [req.params.tagId],
              (err, result) => {
                if (err) throw err;
                else if (result.affectedRows === 1) return res.sendStatus(200);
                else return res.status(500).send("Tag not found.");
              }
            );
          });
        });

    return router;
  }
}