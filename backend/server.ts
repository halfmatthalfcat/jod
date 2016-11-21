/// <reference path="../typings/index.d.ts" />

import "babel-polyfill";
const express = require("express");
import * as MySQL from "mysql";
import * as fs from "fs";
import * as BodyParser from "body-parser";

import {AppRoutes} from "./routes/appRoutes";
import {UserRoutes} from "./routes/userRoutes";
import {UserInfoRoutes} from "./routes/userInfoRoutes";
import {BudgetRoutes} from "./routes/budgetRoutes";
import {BudgetItemRoutes} from "./routes/budgetItemRoutes";
import {TagRoutes} from "./routes/tagRoutes";
import {ImageRoutes} from "./routes/imageRoutes";
import {StatRoutes} from "./routes/statRoutes";
import {Mailer} from "./util/mailer";
import {AWSClient} from "./util/awsClient";

class Server {

  constructor() {
    this.getConfig().then((config) => {
      this.getDb(config).then((db) => {
        this.configRoutes(config, db).then((app) => {
          const server = app.listen(3000, () => {
            console.log("Listening at %s on port %d", server.address().address, server.address().port);
          });
        }, (rejection) => console.log(rejection));
      }, (rejection) => console.log(rejection));
    }, (rejection) => console.log(rejection));
  }

  private getConfig(): any {
    return new Promise((resolve, reject) => {
      fs.readFile("../config.json", "utf-8", function (err, data) {
        if (err) {
          reject(err);
        }
        else {
          try {
            console.log("Successfully loaded config.");
            resolve(JSON.parse(data));
          } catch (e) {
            console.log("Failed to load config.");
            reject(e);
          }
        }
      });
    });
  }

  private getDb(config: any): any {
    return new Promise((resolve, reject) => {
      const pool = MySQL.createPool({
        host: process.env.MYSQL_HOST || config.mysql.host,
        database: process.env.MYSQL_DB || config.mysql.database,
        user: process.env.MYSQL_USER || config.mysql.username,
        password: process.env.MYSQL_PASS || config.mysql.password,
        timezone: "utc",
        // http://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        aquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000
      });
      pool.getConnection((err, conn) => {
        if (err) {
          console.log("Failed to connected to Db.");
          reject(err.code);
        } else {
          console.log("Successfully connected to Db.");
          conn.release();
          resolve(pool);
        }
      });
    });
  }

  private configRoutes(config: any, db: any): any {
    return new Promise((resolve, reject) => {
      const app = express();
      app.use(BodyParser.json({ limit: '50mb' }));
      app.use(express.static("public"));
      app.use(express.static("../node_modules"));

      app.use(AppRoutes.routes(db, config, new Mailer(config)));
      app.use(UserRoutes.routes(db));
      app.use(UserInfoRoutes.routes(db));
      app.use(BudgetRoutes.routes(db));
      app.use(BudgetItemRoutes.routes(db));
      app.use(TagRoutes.routes(db));
      app.use(ImageRoutes.routes(db, new AWSClient(config, "jodimages")));
      app.use(StatRoutes.routes(db));

      app.get("*", (req, res) => {
        res.sendFile(__dirname + "/public/index.html");
      });

      console.log("Successfully added routes to Express");
      resolve(app);
    });
  }
}

new Server();
