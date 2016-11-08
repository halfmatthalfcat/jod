import {Router} from "express";
import {IPool} from "mysql";
import {connection} from "../util/helpers";

export namespace StatRoutes {
  const router = Router();

  export function routes(
    db: IPool
  ): Router {
    router.route("/api/stats/budget")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT YEAR(created) as \`year\`, MONTH(created) as \`month\`, SUM(totalPrice) as total
              FROM BudgetItem
              GROUP BY \`month\`, \`year\`
              ORDER BY \`year\` ASC, \`month\` ASC
            `,
            (err, results) => {
              if (err) res.status(500).send(err);
              else res.json(results);
            }
          )
        })
      });

    router.route("/api/stats/invoice")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT YEAR(invoiced) as \`year\`, MONTH(invoiced) as \`month\`, SUM(totalPrice) as total
              FROM BudgetItem
              WHERE invoiced IS NOT NULL
              GROUP BY \`month\`, \`year\`
              ORDER BY \`year\` ASC, \`month\` ASC
            `,
            (err, results) => {
              if (err) res.status(500).send(err);
              else res.json(results);
            }
          )
        })
      });

    router.route("/api/stats/budget/:userId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT YEAR(bi.created) as \`year\`, MONTH(bi.created) as \`month\`, SUM(bi.totalPrice) as total
              FROM BudgetItem as bi
              JOIN Budget as b
              ON   b.budgetId = bi.budgetId
              AND  b.userId = ? 
              GROUP BY \`month\`, \`year\`
              ORDER BY \`year\` ASC, \`month\` ASC
            `,
            [req.params.userId],
            (err, results) => {
              if (err) res.status(500).send(err);
              else res.json(results);
            }
          )
        })
      });

    router.route("/api/stats/invoice/:userId")
      .get((req, res) => {
        connection(db, res, (conn) => {
          return conn.query(
            `
              SELECT YEAR(bi.invoiced) as \`year\`, MONTH(bi.invoiced) as \`month\`, SUM(bi.totalPrice) as total
              FROM BudgetItem as bi
              JOIN Budget as b
              ON   b.budgetId = bi.budgetId
              AND  b.userId = ? 
              AND  bi.invoiced IS NOT NULL
              GROUP BY \`month\`, \`year\`
              ORDER BY \`year\` ASC, \`month\` ASC
            `,
            [req.params.userId],
            (err, results) => {
              if (err) res.status(500).send(err);
              else res.json(results);
            }
          )
        })
      });

    return router;
  }

}