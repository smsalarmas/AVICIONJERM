import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
//import { Observable } from '../../../node_modules/rxjs/Observable';
import { Storage } from '@ionic/storage';
import { JermSoftProvider } from '../../providers/jerm-soft/jerm-soft';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
 

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


  dataConfig = {
    TimeByPreguntas:0,
    CantPreguntas:0,
    SerialActivo:false
  };
  private CantPreguntasTemp:number=5;
  private TimerTemp:number=60;
  constructor(public navCtrl: NavController, public JermSoft: JermSoftProvider,
    public navParams: NavParams, public storage: Storage,
    public http: HttpClient) {
    /*let data:Observable<any>;
    data = this.http.get('https://conduit.productionready.io/api/profiles/eric');
      data.subscribe(result => {        
        console.log(JSON.stringify(result));
      })*/

    //Sino tiene licencia toca poner 5 preguntas max y 60Seg por pregunta
    //this.storage.set('TimeByPreguntas', 60);
    //this.storage.set('CantPreguntas', 5);
      this.dataConfig.CantPreguntas = this.JermSoft.GetCantPreguntas();
      this.dataConfig.TimeByPreguntas = this.JermSoft.GetTime();
      this.dataConfig.SerialActivo = this.JermSoft.GetLicActiva();
      console.log(`Serial en Config ${this.dataConfig.SerialActivo}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    
  }

  GuardarTime(data){
    this.TimerTemp = data;
  }

  change(data){
    this.CantPreguntasTemp = data;
  }

  GuardarCambios(){
    this.JermSoft.SetCantPreguntas(this.CantPreguntasTemp);
    this.dataConfig.CantPreguntas = this.CantPreguntasTemp;

    this.JermSoft.SetTime(this.TimerTemp);
    this.dataConfig.TimeByPreguntas = this.TimerTemp;

    this.navCtrl.push(HomePage);
  }

  AddLic(){
   
    this.navCtrl.push(LoginPage);
  }
   

}
