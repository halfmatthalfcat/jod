/// <reference path="../typings/tsd.d.ts" />

import 'babel-polyfill';
var express = require('express');
import * as MySQL from 'mysql';
import * as fs from 'fs';
import * as BodyParser from 'body-parser';

class Server {

    constructor(){
        this.getConfig().then( (config) => {
            this.getDb(config).then( (db) => {
                this.configRoutes(config, db).then( (app) => {
                    app.listen(3000);
                }, (rejection) => console.log(rejection))
            }, (rejection) => console.log(rejection))
        }, (rejection) => console.log(rejection));    
    }

    private getConfig(): any {
        return new Promise( (resolve, reject) => {
            fs.readFile('config.json', 'utf-8', function(err, data){
                if(err){ reject(err);  }
                else{
                    try{
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
        return new Promise( (resolve, reject) => {
            var pool = MySQL.createPool({
                host: config.mysql.host,
                database: config.mysql.database,
                user: config.mysql.username,
                password: config.mysql.password
            });
            pool.getConnection( (err, conn) => {
                if(err) {
                    console.log("Failed to connected to Db.");
                    reject(err.code)
                } else {
                    console.log("Successfully connected to Db.");
                    conn.release();
                    resolve(pool);
                }    
            });
        });
    }

    private configRoutes(config: any, db: any): any {
        return new Promise( (resolve, reject) => {
            var app = express();
            app.set('view engine', 'jade');
            app.use( BodyParser.json() );
            app.use(express.static('public'));            
            app.use(express.static('../node_modules'));

            app.get('/', (req, res) => {
                res.render('index');
            });

            app.post('/login', (req, res) => {
                db.getConnection( (err, conn) => {
                    if(err) return res.status(503).send("Couldn't establish db connection: " + err);
                    else {
                        try{
                            conn.query(
                                'SELECT * '+
                                'FROM accounts ' +
                                'WHERE email LIKE ? ' +
                                'AND password LIKE ?',
                                [req.body.email, req.body.password],
                                (err, rows) => {
                                    if(err) return res.status(503).send("Query error occured: " + err);
                                    else if(rows[0]){
                                        var user = rows[0];
                                        user.password = '';
                                        return res.send(JSON.stringify(user));
                                    } else {
                                        console.log("Invalid login attempt from: " + req.body.email);
                                        return res.sendStatus(400);
                                    }
                                }      
                            );
                        } finally {
                            conn.release();
                        }
                    }
                });
            });

            /* GET ACCOUNTS */
            app.get('/api/accounts', (req, res) => {
                db.getConnection( (err, conn) => {
                    if(err) res.status(503).body("Couldn't establish db connection: " + err);
                    else {
                        try {
                            conn.query(
                                'SELECT accountId, accountName ' +
                                'FROM accounts',
                                (err, rows) => {
                                    if(err) res.status(503).send("Query error occured: " + err);
                                    else res.send(JSON.stringify(rows));
                            });
                        } finally {
                            conn.release();
                        }
                    }
                });    
            });
            
            app.route('/api/account')
                .post( (req, res) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.status(503).send("Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'INSERT INTO accounts ' +
                                    'SET ? ',
                                    req.body,
                                    (err, rows) => {
                                        if(err) res.status(503).send("Query error occured: " + err);
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
                        if(err) res.status(503).send("Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'SELECT * ' +
                                    'FROM accounts ' +
                                    'WHERE accountId = ?',
                                    req.params.accountId,
                                    (err, rows) => {
                                        if(err) res.status(503).send("Query error occured: " + err);
                                        else {
                                            rows.map( (val) => {
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
                        if(err) res.status(503).send("Couldn't establish db connection: " + err);
                        else {
                            try{
                                conn.query(
                                    'UPDATE accounts ' +
                                    'SET ? ' +
                                    'WHERE accountId = ?',
                                    [ req.body, req.params.accountId ],
                                    (err, rows) => {
                                        if(err) res.status(503).send("Query error occured: " + err);
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
                .post( (req, res) => {
                    db.getConnection( (err, conn) => {
                        if(err) res.status(503).send("Couldn't establish db connection: " + err);
                        else{
                            try{
                                conn.query(
                                    'INSERT INTO budgetItems ' +
                                    'SET ? ' +
                                    'WHERE accountId = ?',
                                    [req.body, req.params.accountId],
                                    (err, rows) => {
                                        if(err) res.status(503).send("Query error occured: " + err);
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
               .get( (req, res) => { 
                    db.getConnection( (err, conn) => {
                        if(err) res.status(503).send("Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'SELECT * ' +
                                    'FROM budgetItems ' +
                                    'WHERE accountId = ?',
                                    req.params.accountId,
                                    (err, rows) => {
                                        if(err) res.status(503).send("Query error occured: " + err);
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
                        if(err) res.status(503).send("Couldn't establish db connection: " + err);
                        else {
                            try {
                                conn.query(
                                    'UPDATE budgetItems ' +
                                    'SET ? ' +
                                    'WHERE budgetItemId = ?',
                                    [req.body, req.params.itemId],
                                    (err, rows) => {
                                        if(err) res.status(503).send("Query error occured: " + err);
                                        else if(rows.affectedRows == 1) res.send(203);
                                    }
                                );
                            } finally {
                                conn.release();
                            }
                        }
                    });
                });
            console.log("Successfully added routes to Express");
            resolve(app);
        });
    }
}

new Server();
