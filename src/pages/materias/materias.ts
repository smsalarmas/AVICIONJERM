import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { PreguntasPage } from '../preguntas/preguntas';
/**
 * Generated class for the MateriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
})
export class MateriasPage {

  public items:any;
  public Materia:string;
  private Paramter:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.Paramter = this.navParams.get('id');
    this.loadData();
    
    console.log(this.Paramter);
 
  }
  
  loadData(){
    let data:Observable<any>;
    if (this.Paramter == 'PP'){
      this.Materia = 'Privado';
      data = this.http.get('/assets/json/PP.json');
      data.subscribe(result => {
        this.items = result;
      })
    }
    if (this.Paramter == 'PC'){
      this.Materia = 'Comercial';
      data = this.http.get('/assets/json/PC.json');
      data.subscribe(result => {
        this.items = result;
      })
    }
    if (this.Paramter == 'IFR'){
      this.Materia = 'IFR';
      data = this.http.get('/assets/json/IFR.json');
      data.subscribe(result => {
        this.items = result;
      })
    }
    
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MateriasPage');
  }

  openPreguntasPage(i){
    console.log(i,this.Paramter);
    this.navCtrl.push(PreguntasPage, {id:i,Mat:this.Paramter,Materia:this.Materia});
  }

}



