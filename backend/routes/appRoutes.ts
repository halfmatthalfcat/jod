import {connection} from "../util/helpers";

import {IPool} from "mysql";
import {Router} from "express";
import * as jwt from "jwt-simple";
import {Mailer} from "../util/mailer";
import {IUser} from "../../common/models/models";

export namespace AppRoutes {
  const router = Router();

  export function routes(
    db: IPool,
    config: any,
    mailer: Mailer
  ): Router {
      router.route("/validate/:token")
        .get((req, res) => {
          try {
            const jwtResult = jwt.decode(req.params.token, config.jwt.secret);
            if (jwtResult) {
              connection(db, res, (conn) => {
                conn.query(
                  `
                  SELECT  *
                  FROM    User
                  WHERE   Active = 1 AND
                          UserId = ?
                `,
                  [jwtResult.sub],
                  (err, result) => {
                    if (err) res.status(500).send(err);
                    else if (result[0]) return res.json(result[0]);
                    else return res.status(500).send("User not found.");
                  }
                );
              });
            } else res.sendStatus(401);
          } catch (err) {
            res.status(401).send("Invalid token.");
          }
        });

      router.route("/request/:email")
        .get((req, res) => {
          connection(db, res, (conn) => {
            conn.query(
              `
                SELECT EXISTS(
                  SELECT  1
                  FROM    User
                  WHERE   Active = 1 AND
                          Email LIKE ?
                       
                ) as 'exists'
              `,
              [req.params.email],
              (err, result) => {
                if (err) res.status(500).send(err);
                else if (result[0].exists === 1) {
                  conn.query(`SELECT * FROM User WHERE Email LIKE ?`, [req.params.email], (err, result2) => {
                    if (err) res.status(500).send(err);
                    else if (result2[0]) {
                      mailer
                        .sendLoginMail(result2[0] as IUser)
                        .then(() => {
                          res.status(200).send(true);
                        })
                        .catch((err) => {
                          res.status(500).send(false);
                        });
                    } else return res.status(500).send(false);
                  });
                } else return res.status(200).send(false);
              }
            );
          });
        });

    return router;
  }

}