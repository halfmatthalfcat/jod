import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";
import {ITagGroup} from "../../common/models/models";

export namespace TagRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
      router.route("/api/tag/group")
        .post((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                INSERT INTO TagGroup
                (TagGroupName) VALUES (?)
              `,
              [req.body.tagGroupName],
              (err, result) => {
                if (err) throw err;
                else if (result.insertId) {
                  conn.query(`SELECT * FROM TagGroup WHERE TagGroupId = ?`, [result.insertId], (err, result2) => {
                    if (err) throw err;
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("Couldn't retrieve TagGroup.");
                  });
                } else return res.status(500).send("Couldn't add TagGroup.");
              }
            )
          });
        })
        .put((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                UPDATE  TagGroup
                SET     TagGroupName = ?
                WHERE   TagGroupId = ?
              `,
              [req.body.tagGroupName, req.body.tagGroupId],
              (err, result) => {
                if (err) throw err;
                else if (result.affectedRows === 1) {
                  conn.query(`SELECT * FROM TagGroup WHERE TagGroupId = ?`, [req.body.tagGroupId], (err, result2) => {
                    if (err) throw err;
                    else if (result2[0]) return res.json(result2[0]);
                    else return res.status(500).send("Couldn't retrieve TagGroup.");
                  });
                } else return res.status(500).send("Couldn't update TagGroup.");
              }
            )
          });
        });
      router.route("/api/tag/group/:tagGroupId")
        .post((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                INSERT INTO Tag
                (TagName, TagColor, TagTextColor)
                VALUES
                (?, ?, ?)
              `,
              [req.body.tagName, req.body.tagColor, req.body.tagTextColor],
              (err, result) => {
                if (err) throw err;
                else if (result.insertId) {
                  conn.query(
                    `
                      INSERT INTO TagGroupMap
                      (TagGroupId, TagId)
                      VALUES
                      (?, ?)
                    `,
                    [req.params.tagGroupId, result.insertId],
                    (err, result2) => {
                      if (err) throw err;
                      else if (result2.affectedRows === 1) {
                        conn.query(`SELECT * FROM Tag WHERE TagId = ?`, [result.insertId], (err, result3) => {
                          if (err) throw err;
                          else if (result3[0]) return res.json(result3[0]);
                          else return res.status(500).send("Couldn't retrieve Tag.");
                        });
                      } else return res.status(500).send("Couldn't add Tags.");
                    }
                  );
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
                        TagColor = ?,
                        TagTextColor = ?
                WHERE   TagId = ?
              `,
              [
                req.body.tagName,
                req.body.tagColor,
                req.body.tagTextColor,
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

      router.route("/api/tag/group/all")
        .get((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                SELECT  *
                FROM    TagGroup
              `,
              (err, result) => {
                if (err) throw err;
                else if (result && result.length > 0) {
                  Promise.all(result.map((tagGroup) => {
                    return new Promise((resolve, reject) => {
                      conn.query(
                        `
                          SELECT  t.*
                          FROM    TagGroupMap as tgm
                          JOIN    Tag as t
                          ON      tgm.TagId = t.TagId
                          WHERE   TagGroupId = ?
                        `,
                        [tagGroup.tagGroupId],
                        (err, results2) => {
                          if (err) reject(err);
                          else resolve({ tagGroupName: tagGroup.tagGroupName, tagGroupId: tagGroup.tagGroupId, tags: results2 });
                        }
                      );
                    });
                  })).then((tagGroups) => {
                    res.json(tagGroups);
                  }, () => {
                    res.status(500).send("Couldn't get TagGroups");
                  })
                } else res.json(result);
              }
            );
          })
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