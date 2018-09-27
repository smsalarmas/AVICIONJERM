import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { JermSoftProvider } from '../providers/jerm-soft/jerm-soft';


import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { LoginPage } from '../pages/login/login';

//import { CarrerasPage } from '../pages/carreras/carreras';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public jermSoftProvider: JermSoftProvider,
    public sqlite: SQLite) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Configuración', component: ConfigPage },
      { title: 'Licencia', component: LoginPage },
      { title: 'Salir', component: LoginPage }
    ];

    this.createDatabase();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //TODO: Esto lo comente porque da un error en la cosola...
      //Jhonattan
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page.title);
    if (page.title == 'Salir'){
      this.platform.exitApp();
    }else{
      this.nav.setRoot(page.component);
    }    
    
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'JermSoft.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log(db);
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
