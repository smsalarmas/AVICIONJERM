import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the JermSoftProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  Referencia: https://blog.ng-classroom.com/blog/ionic2/sqlite-and-ionic/
  HECHO: Jhonattan ramirez
  FECHA: 24/09/2018
  Este archivo fue creado por el comando CMD: ionic g provider Jerm-Soft
*/
@Injectable()
export class JermSoftProvider {

  //db: SQLiteObject = null;

  constructor(public http: HttpClient) {
    console.log('Hello JermSoftProvider Provider');
  }

  /*setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  Insertar(Lic: any){
    let sql = 'INSERT INTO Licencia(nombre, email, whatsapp, serial) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [Lic.nombre, Lic.email, Lic.whatsapp, Lic.serial]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS Licencia(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, email TEXT, whatsapp TEXT,serial TEXT)';
    return this.db.executeSql(sql, []);
  }

  getAll(){
    let sql = 'SELECT * FROM Licencia';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }*/

}
