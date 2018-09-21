import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    let data:Observable<any>;
    data = this.http.get('https://conduit.productionready.io/api/profiles/eric');
      data.subscribe(result => {        
        console.log(JSON.stringify(result));
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

}
