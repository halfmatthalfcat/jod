/// <reference path="../typings/tsd.d.ts" />

import { Express } from 'express';
import { MySQL } from 'mysql';
import { fs } from 'fs';
import { Promise } from 'es6-promise';
import { $ } from 'jquery';

class Server {

    constructor(){
        this.getConfig().then((config) => 
            this.getDb(config).then( (db) =>
                this.configRoutes(db).then( (app) => 
                    app.listen(3000);
                );
            );
        );    
    }

    private getConfig(): Promise<Object> {
        return new Promise( (resolve, reject) => 
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
        );
    }

    private getDb(config: Object): Promise<any> {
        return new Promise( (resolve, reject) => 
            var pool = MySQL.createPool({i
                host: config.mysql.host,
                database: config.mysql.db,
                user: config.mysql.user,
                password: config.mysql.password
            });
            pool.getConnection( (err, conn) => 
                if(err) {
                    reject(err.code)
                } else {
                    conn.release();
                    resolve(pool);
                }    
            );
        );
    }

    private configRoutes(db: any): Promise<any> {
        return new Promise( (resolve, reject) => 
        
            

        );
    }

    

}

new Server();
