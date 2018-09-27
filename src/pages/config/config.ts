import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {


  userData = {
    TimeByPreguntas: '',
    CantPreguntas: ''
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private storage: Storage,
    public http: HttpClient) {
    let data:Observable<any>;
    data = this.http.get('https://conduit.productionready.io/api/profiles/eric');
      data.subscribe(result => {        
        console.log(JSON.stringify(result));
      })

    //Sino tiene licencia toca poner 5 preguntas max y 60Seg por pregunta
    //this.storage.set('TimeByPreguntas', 60);
    //this.storage.set('CantPreguntas', 5);

    this.StorageGet('CantPreguntas', this.userData.CantPreguntas);
    this.StorageGet('TimeByPreguntas', this.userData.TimeByPreguntas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    
  }

  GuardarTime(data){
    this.userData.TimeByPreguntas = data;
    this.storage.set('TimeByPreguntas', this.userData.TimeByPreguntas);
  }

  change(data){
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
             
            resolve(data);
        })
            .catch(() => {
                console.log(" Load DEFAULTS", Default);
                resolve(Default);
            });
    });
  }

}
