import {Response} from "~express/lib/response";
import {IPool, IError} from "mysql";

/**
 * Wrapper function for handling db connections
 * */
export function connection(db: IPool, res: Response, fn: (IConnection) => Response): void {
  db.getConnection((err, conn) => {
    if(err) res.status(503).send(`Couldn't establish db connection: ${err}`);
    else try {
      fn(conn);
    } catch(err) {
      switch(typeof err){
        case IError: res.status(503).send(`Query error: ${err}`); break;
        default: res.status(500).send(`Connection error: ${err}`);
      }
    } finally {
      conn.release();
    }
  })
}