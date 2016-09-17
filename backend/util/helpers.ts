import {Response} from "~express/lib/response";
import {IPool, IQuery} from "mysql";
import {IConnection} from "mysql";

/**
 * Wrapper function for handling db connections
 * */
export function connection(db: IPool, res: Response, fn: (conn: IConnection) => void): void {
  db.getConnection((err, conn) => {
    if (err) res.status(503).send(`Couldn't establish db connection: ${err}`);
    else try {
      fn(conn);
    } catch (err) {
      res.status(500).send(`Query error: ${err}`);
    } finally {
      conn.release();
    }
  });
}