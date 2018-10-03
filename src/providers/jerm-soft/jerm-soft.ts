import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
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
 
  userData = {
    TimeByPreguntas: 0,
    CantPreguntas:0,
    Serial:'',
    SerialActivo:false
    
  };
  private Respuestas:any;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello JermSoftProvider Provider');
    this.Load();

  }

  Load(){
    this.GetRespuestas();
    this.GetTime();
    this.GetCantPreguntasLoad();
    this.GetLicActiva();
  }


  GetLicActiva(){
    this.StorageGet('Serial', this.userData.Serial);
    return this.userData.SerialActivo;
  }

  GetTime(){
    //this.userData.TimeByPreguntas = 65;
    this.StorageGet('TimeByPreguntas', this.userData.TimeByPreguntas);
    console.log(this.userData.TimeByPreguntas);
    return this.userData.TimeByPreguntas;
    
  }

  GetCantPreguntasLoad(){
    //this.userData.CantPreguntas = 5;
    this.StorageGet('CantPreguntas', this.userData.CantPreguntas);
    console.log(this.userData.CantPreguntas);   
  }

  GetCantPreguntas(){
    console.log(this.userData.CantPreguntas);
    return this.userData.CantPreguntas;
  }

  GetRespuestas(){
    this.StorageGet('CantPreguntas', this.Respuestas);
    return this.Respuestas;
  }

  SetTime(data){
    console.log(data);
    this.userData.TimeByPreguntas = data;
    this.storage.set('TimeByPreguntas', this.userData.TimeByPreguntas);
  }

  SetRespuestas(data)
  {
    this.Respuestas = data;
    this.storage.set('Respuestas', this.Respuestas);
  }

  SetCantPreguntas(data){
    console.log(data);
    //Si la licencia esta activa
    this.userData.CantPreguntas = data;
    this.storage.set('CantPreguntas', this.userData.CantPreguntas);
  }

  

  StorageGet(Key: string, Default: any) {

    return new Promise((resolve, reject) => {
        this.storage.get(Key).then((data) => {
            console.log(" Storage.get ", Key, data);
            if (Key === 'TimeByPreguntas') this.userData.TimeByPreguntas = data.toString();
            if (Key === 'CantPreguntas') this.userData.CantPreguntas = data.toString();
            if (Key === 'Serial') {
              this.userData.Serial = data.toString();
              if ( this.userData.Serial) {
                this.userData.SerialActivo = true;
              }
            }

            resolve(data);
        })
            .catch(() => {
                if (Key === 'TimeByPreguntas') this.userData.TimeByPreguntas = Default;
                if (Key === 'CantPreguntas') this.userData.CantPreguntas = Default;
                console.log(" Load DEFAULTS", Default);
                resolve(Default);
            });
    });
  }
  

  
}
