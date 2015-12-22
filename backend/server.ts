/// <reference path="../typings/tsd.d.ts" />

import { Express } from 'express';
import { MySQL } from 'mysql';
import { fs } from 'fs';
import { Promise } from 'es6-promise';
import { $ } from 'jquery';
import { BodyParser } from 'body-parser';

class Server {

    constructor(){
        this.getConfig().then((config) => {
            this.getDb(config).then( (db) => {
                this.configRoutes(db).then( (app) => {
                    app.listen(3000);
                });
            });
        });    
    }

    private getConfig(): Promise<Object> {
        return new Promise( (resolve, reject) => {
            fs.readFile('../config.json', function(err, data){
                if(err){ reject(err);  }
                else{
                    try{
                       resolve($.parseJSON(data));
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });
    }

    private getDb(config: Object): Promise<any> {
        return new Promise( (resolve, reject) => {
            var pool = MySQL.createPool({i
                host: config.mysql.host,
                database: config.mysql.db,
                user: config.mysql.user,
                password: config.mysql.password
            });
            pool.getConnection( (err, conn) => {
                if(err) {
                    reject(err.code)
                } else {
                    conn.release();
                    resolve(pool);
                }    
            });
        });
    }

    private configRoutes(db: any): Promise<any> {
        return new Promise( (resolve, reject) => {

            var app = Express();
            app.use( BodyParser.json() );

            /* GET ACCOUNTS */
            app.get('/api/accounts', (req, res) => {
                db.getConnection( (err, conn) => {
                    if(err) res.send(503, "Couldn't establish db connection: " + err);
                    else {
                        try {
                            conn.query(
                                'SELECT accountId, accountName ' +
                                'FROM accounts',
                                (err, rows) => {
                                    if(err) res.send(503, "Query error occured: " + err);
                                    else res.send(JSON.stringify(rows));
                            });
                        } finally {
                            conn.release();
                        }
                    }
                });    
            });
            
            app.route('/api/account')
                .post (req, res) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.send(503, "Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'INSERT INTO accounts ' +
                                    'SET ? ',
                                    req.body,
                                    (err, rows) => {
                                        if(err) res.send(503, "Query error occured: " + err);
                                        else if (rows.insertId >= 0) res.send(201);
                                    }    
                                );
                            } finally {
                                conn.release();
                            }
                        }
                    });
                });

            app.route('/api/account/:accountId')
                .get( (req, res) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.send(503, "Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'SELECT * ' +
                                    'FROM accounts ' +
                                    'WHERE accountId = ?',
                                    req.params.accountId,
                                    (err, rows) => {
                                        if(err) res.send(503, "Query error occured: " + err);
                                        else {
                                            $.map(rows, (val, i) => {
                                                val.password = ''
                                            });
                                            res.send(JSON.stringify(rows));
                                        }
                                    }
                                );
                            } finally {
                                conn.release();
                            }
                        }         
                    });
                })
                .put( (req, res) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.send(503, "Couldn't establish db connection: " + err);
                        else {
                            try{
                                conn.query(
                                    'UPDATE accounts ' +
                                    'SET ? ' +
                                    'WHERE accountId = ?',
                                    [ req.body, req.params.accountId ],
                                    (err, rows) => {
                                        if(err) res.send(503, "Query error occured: " + err);
                                        else if(rows.affectedRows == 1) res.send(203);
                                    }
                                );
                            } finally {
                                conn.release();
                            }
                        }
                    });
                });
            
            /* GET BUDGETITEMS */

            app.route('/api/item')
                .post( (res, req) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.send(503, "Couldn't establish db connection: " + err);
                        else{
                            try{
                                conn.query(
                                    'INSERT INTO budgetItems ' +
                                    'SET ? ' +
                                    'WHERE accountId = ?',
                                    [req.body, req.params.accountId],
                                    (err, rows) => {
                                        if(err) res.send(503, "Query error occured: " + err);
                                        else if(rows.insertId >= 0) res.send(201);
                                    }    
                                );
                            } finally {
                                conn.release();
                            }
                        }
                    });
                });

            app.route('/api/items/:accountId')
               .get( (res, req) => { 
                    db.getConnection( (err, conn) => {
                        if(err) res.send(503, "Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'SELECT * ' +
                                    'FROM budgetItems ' +
                                    'WHERE accountId = ?',
                                    req.params.accountId,
                                    (err, rows) => {
                                        if(err) res.send(503, "Query error occured: " + err);
                                        else res.send(JSON.stringify(rows));
                                    }
                                );
                            } finally {
                                conn.release();
                            }
                        }
                    });
                });        

            app.route('/api/item/:itemId')
                .put( (req, res) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.send(503, "Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'UPDATE budgetItems ' +
                                    'SET ? ' +
                                    'WHERE budgetItemId = ?',
                                    [req.body, req.params.itemId],
                                    (err, rows) => {
                                        if(err) res.send(503, "Query error occured: " + err);
                                        else if(rows.affectedRows == 1) res.send(203);
                                    }
                                );
                            } finally {
                                conn.release();
                            }
                        }
                    });
                });

            resolve(app);
        );
    }
}

new Server();
