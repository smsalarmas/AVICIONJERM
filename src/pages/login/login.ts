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
    WhatsApp: '',
    idEscuela: '1'
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage, public http: HttpClient) {
    this.StorageGet('NameAlumno', this.userData.firstName);
    this.StorageGet('Email', this.userData.Email);
    this.StorageGet('WhatsApp', this.userData.WhatsApp);
    this.StorageGet('Serial', this.userData.Serial);
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

  GuardarWhatsApp(Valor){
    this.userData.WhatsApp = Valor;
    console.log(this.userData.WhatsApp);    
  }

  GuardarSerial(Valor){
    this.userData.Serial = Valor;
    console.log(this.userData.Serial);    
  }

  ChequeoSerial(){
    let data:Observable<any>;
    console.log(this.userData.Serial);    
    this.storage.set('NameAlumno', this.userData.firstName);
    this.storage.set('Email', this.userData.Email);
    this.storage.set('WhatsApp', this.userData.WhatsApp);
    this.storage.set('Serial', "********");
    //https://gps.soluseguridad.com/avl/movil/CheckSerial.php?nombre=jhon&email=jhon&whatsapp=0&serial=469-f2288&idEscuela=1
    data = this.http.get('https://gps.soluseguridad.com/avl/movil/CheckSerial.php?nombre=jhon&email=jhon&whatsapp=0&serial=469-f2288&idEscuela=1');    
    data.subscribe(result => {        

      console.log(JSON.stringify(result));
    })
  }

  StorageGet(Key: string, Default: any) {

    return new Promise((resolve, reject) => {
        this.storage.get(Key).then((data) => {
            console.log(" Storage.get ", Key, data);
            if (Key === 'NameAlumno') this.userData.firstName = data.toString();
            if (Key === 'Email') this.userData.Email = data.toString();
            if (Key === 'WhatsApp') this.userData.WhatsApp = data.toString();
            if (Key === 'Serial') this.userData.Serial = data.toString();
            resolve(data);
        })
            .catch(() => {
                console.log(" Load DEFAULTS", Default);
                resolve(Default);
            });
    });
}

}

