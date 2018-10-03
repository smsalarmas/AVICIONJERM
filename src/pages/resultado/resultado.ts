import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {


  public Id:string;     //Indica el ID de la pregunta, Ej: _1.json solo retorna 1
  public Mat:string;    //Indica la carpeta del json
  public Materia:string;
  private Respuestas:any;
  public items:any;
  public ToalPreguntas:number;
  public StatusMostrar:boolean[] = [true];
  public RespuestasCorrecta:boolean[] = [true];
  public RespuestaColor:string[] = ["bg-color-green"];
  public RespuestaStr:string[] = [""];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public http: HttpClient) {
    let data:Observable<any>;
    this.Id = this.navParams.get('id');
    this.Mat = this.navParams.get('Mat');
    this.Materia = this.navParams.get('Materia');
    this.Respuestas = this.navParams.get('respuestas');

    data = this.http.get('/assets/json/' + this.Mat + '/_' + this.Id + '.json');    
      data.subscribe(result => {        
         
        this.items = result;

        this.ToalPreguntas = this.navParams.get('totalpregun');
        
        for (var i=1;i<this.items.length;i++)
        {
          if (this.ToalPreguntas > i) this.StatusMostrar.push(true);
          else  this.StatusMostrar.push(false);

          this.EvaluarRespuesta(this.Respuestas[i], this.items[i].RespuestaCorrecta, i);
          
          if (this.items[i].RespuestaCorrecta === "1") this.RespuestaStr.push(this.items[i].A);
          if (this.items[i].RespuestaCorrecta === "2") this.RespuestaStr.push(this.items[i].B);
          if (this.items[i].RespuestaCorrecta === "3") this.RespuestaStr.push(this.items[i].C);
          if (this.items[i].RespuestaCorrecta === "4") this.RespuestaStr.push(this.items[i].D);
          if (this.items[i].RespuestaCorrecta === "5") this.RespuestaStr.push(this.items[i].E);
          if (this.items[i].RespuestaCorrecta === "6") this.RespuestaStr.push(this.items[i].F);

        }

        console.log(JSON.stringify(result));
      })
  }

  EvaluarRespuesta(LoQueRespondi:number, RespuestaCorrecta:string, Pregunta:number){
 
    let resulta:boolean;
    resulta = false;
    console.log("entre a EvaluarRespuesta");
    console.log(LoQueRespondi,RespuestaCorrecta);

    if (LoQueRespondi === 1 && RespuestaCorrecta === "1")  {      
      this.RespuestaColor.push("bg-color-red");
      resulta = true;
    } else if (LoQueRespondi === 2 && RespuestaCorrecta === "2")  {      
      this.RespuestaColor.push("bg-color-red");
      resulta = true;
    } else if (LoQueRespondi === 3 && RespuestaCorrecta === "3")  {      
      this.RespuestaColor.push("bg-color-red");
      resulta = true;
    } else if (LoQueRespondi === 4 && RespuestaCorrecta === "4")  {      
      this.RespuestaColor.push("bg-color-red");
      resulta = true;
    } else if (LoQueRespondi === 5 && RespuestaCorrecta === "5")  {      
      this.RespuestaColor.push("bg-color-red");
      resulta = true;
    } else this.RespuestaColor.push("bg-color-green");

    this.RespuestasCorrecta.push(resulta);
  } 

  ColorRespuesta(value){
    if (value === true) return "bg-color-green"
    else return "bg-color-red"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  doRefresh(){
    console.log('ionViewDidLoad doRefresh');
  }

}
