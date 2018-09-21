import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MateriasPage } from '../materias/materias';

@IonicPage()
@Component({
  selector: 'page-carreras',
  templateUrl: 'carreras.html',
})
export class CarrerasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrerasPage');
  }

  openMateriasPage( title:string) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(MateriasPage, {id:title});
  }

}
