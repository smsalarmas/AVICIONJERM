import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { LoginPage } from '../pages/login/login';
import { CarrerasPage } from '../pages/carreras/carreras';
import { MateriasPage } from '../pages/materias/materias';
import { PreguntasPage } from '../pages/preguntas/preguntas';
import { ResultadoPage } from '../pages/resultado/resultado';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule  } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage, 
    LoginPage,
    CarrerasPage,
    MateriasPage,
    PreguntasPage,
    ResultadoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage,
    LoginPage,
    CarrerasPage,
    MateriasPage,
    PreguntasPage,
    ResultadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
