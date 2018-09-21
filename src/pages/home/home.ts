import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav } from 'ionic-angular';

import { ConfigPage } from '../config/config';
import { CarrerasPage } from '../carreras/carreras';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  YourFancyButton: any;

  public navController: NavController
  pages: Array<{title: string, component: any}>;
  public TopBlack: string;
  constructor(public navCtrl: NavController, public plt: Platform) {
    this.YourFancyButton = CarrerasPage;
    if (this.plt.is('ios')) {
      // This will only print when on iOS
      console.log('I am an iOS device!');
      this.TopBlack = "<BR/>";
    }else{
      this.TopBlack = "";
    }

    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Configuración', component: ConfigPage },
      { title: 'Carreras', component: CarrerasPage }
    ];
  }

  openConfigPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(ConfigPage);
  }

  openCarrerasPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(CarrerasPage);
  }

}
