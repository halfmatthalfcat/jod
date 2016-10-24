import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";
import {AWSClient} from "../util/awsClient";

export namespace ImageRoutes {
  const router = Router();

  export function routes(
    db: IPool,
    awsClient: AWSClient
  ): Router {
    router.route("/api/image")
      .post((req, res) => {
        const strippedImage = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
        awsClient.putImage(req.body.key, strippedImage).then((s3Url) => {
          console.log(`${req.body.key}, ${s3Url}, ${req.body.description}`);
          connection(db, res, (conn) => {
            conn.query(
              `
                INSERT INTO Image
                (\`key\`, s3Url, description)
                VALUES
                (?, ?, ?)
              `,
              [
                req.body.key,
                s3Url,
                req.body.description || null
              ], (err, result) => {
              if (err) res.status(500).send(err);
              else if (result.insertId) {
                conn.query(`SELECT * FROM Image WHERE imageId = ?`, [result.insertId], (err, result2) => {
                  if (err) res.status(500).send(err);
                  else if (result2[0]) res.json(result2[0]);
                });
              } else res.status(500).send("Unable to insert image");
            });
          });
        }, (err) => { res.status(500).send(err); });
      })
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(
            `
              SELECT *
              FROM Image
            `,
            (err, result) => {
              if (err) res.status(500).send(err)
              else res.json(result);
            }
          )
        })
      });

    router.route("/api/image/:imageId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          conn.query(`
            SELECT *
            FROM Image
            WHERE imageId = ?
          `, [req.params.imageId], (err, result) => {
            if (err) res.status(500).send(err);
            else if (result[0]) res.json(result[0]);
            else result.status(500).send("Unable to get image");
          });
        })
      })
      .put((req, res) => {
        connection(db, res, (conn) => {
          conn.query(`
            UPDATE Image
            SET description = ?,
                s3Url = ?
            WHERE imageId = ?
          `, [
            req.body.description,
            req.body.s3Url,
            req.body.imageId
          ], (err, result) => {
            if (err) res.status(500).send(err);
            else if (result.affectedRows === 1) {
              conn.query(`
                SELECT * FROM Image WHERE imageId = ?
              `, [req.body.imageId], (err, result2) => {
                if (err) res.status(500).send(err);
                else if (result2[0]) res.json(result2[0]);
                else res.status(500).send("Unable to get image");
              })
            } else res.status(500).send("Unable to update image");
          })
        });
      })
      .delete((req, res) => {
        connection(db, res, (conn) => {
          conn.query(`DELETE FROM Image WHERE imageId = ?`, [req.body.imageId], (err, result) => {
            if (err) res.status(500).send(err);
            else if (result.affectedRows === 1) res.sendStatus(200);
            else res.status(500).send("Unable to delete image");
          })
        })
      });

    return router;
  }

}