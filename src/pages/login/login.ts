import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public Pregunta:any;
  public RespuestaCorrecta:any;

  userData = {
    firstName: '',
    Email: '',
    Serial: '',
    idEscuela: '1'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public http: HttpClient) {
    this.StorageGet('NameAlumno', this.userData.firstName);
    
    /*storage.get('NameAlumno').then((val) => {
      
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  GuardarName(Valor){
    this.userData.firstName = Valor;
    console.log(this.userData.firstName);    
  }

  GuardarEmail(Valor){
    this.userData.Email = Valor;
    console.log(this.userData.Email);    
  }

  GuardarSerial(Valor){
    this.userData.Serial = Valor;
    console.log(this.userData.Serial);    
  }

  ChequeoSerial(){
    let data:Observable<any>;
    console.log(this.userData.Serial);    
    this.storage.set('NameAlumno', this.userData.firstName);
    data = this.http.get('/assets/json/PP/_1.json');    
      data.subscribe(result => {    
        //console.log(JSON.stringify(result));
        //console.log(JSON.stringify(result));
        this.Pregunta = result.Pregunta;
        console.log(JSON.stringify(result));
      })
    
  }

  StorageGet(Key: string, Default: any) {

    return new Promise((resolve, reject) => {
        this.storage.get(Key).then((data) => {
            console.log(" Storage.get ", Key, data);
            resolve(data);
        })
            .catch(() => {
                console.log(" Load DEFAULTS", Default);
                resolve(Default);
            });
    });
}

}

