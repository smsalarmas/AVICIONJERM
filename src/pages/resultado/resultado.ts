import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { HomePage } from '../home/home';
import { JermSoftProvider } from '../../providers/jerm-soft/jerm-soft';
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
  private Respondio:any;
  private RespondioBien:any;
  public items:any;
  public ToalPreguntas:number;
  public ToalCorrectas:number = 0;
  public StatusMostrar:boolean[] = [false];
  public RespuestasCorrecta:boolean[] = [false];
  public RespuestaColor:string[] = ["bg-color-red"];
  public RespuestaStr:string[] = [""];

  constructor(public navCtrl: NavController, private JermSoft: JermSoftProvider,
    public navParams: NavParams, public http: HttpClient) {
    let data:Observable<any>;
    this.Id = this.navParams.get('id');
    this.Mat = this.navParams.get('Mat');
    this.Materia = this.navParams.get('Materia');
    this.Respuestas = this.navParams.get('respuestas');
    this.Respondio = this.navParams.get('respondio');
    this.RespondioBien = this.navParams.get('respondiobien');

    data = this.http.get('/assets/json/' + this.Mat + '/_' + this.Id + '.json');    
      data.subscribe(result => {        
         
        this.items = result;

        this.ToalPreguntas = this.navParams.get('totalpregun');
        for (var i=1;i<this.items.length;i++)
        {
         this.RespuestaStr.push("");
         this.RespuestaColor.push("bg-color-red");
         this.RespuestasCorrecta.push(false);
         this.StatusMostrar.push(false);
        }
        for (i=0;i<this.items.length;i++)
        {
          if (this.ToalPreguntas > i) this.StatusMostrar[i] = true;

          if (this.items[i].RespuestaCorrecta === "1") this.RespuestaStr[i] = this.items[i].A;
          if (this.items[i].RespuestaCorrecta === "2") this.RespuestaStr[i] = this.items[i].B;
          if (this.items[i].RespuestaCorrecta === "3") this.RespuestaStr[i] = this.items[i].C;
          if (this.items[i].RespuestaCorrecta === "4") this.RespuestaStr[i] = this.items[i].D;
          if (this.items[i].RespuestaCorrecta === "5") this.RespuestaStr[i] = this.items[i].E;
          if (this.items[i].RespuestaCorrecta === "6") this.RespuestaStr[i] = this.items[i].F;

          console.log("Consola: " + JSON.stringify(this.RespuestaStr[i]) + " Index " + i);
          this.EvaluarRespuesta(this.Respuestas[i], this.Respondio[i], i);
        }

        //console.log(JSON.stringify(result));
      })
  }

  EvaluarRespuesta(LoQueRespondi:number, RespuestaCorrecta:number, Pregunta:number){
 
    let resulta:boolean;
    resulta = false;
    console.log("entre a EvaluarRespuesta");
    console.log(LoQueRespondi,RespuestaCorrecta);

    if (this.RespondioBien[Pregunta])  { 
      this.RespuestaColor[Pregunta] = ("bg-color-green");
      resulta = true;
      this.ToalCorrectas = this.ToalCorrectas + 1;
    } else this.RespuestaColor[Pregunta] = ("bg-color-red");

    /*if (LoQueRespondi === RespuestaCorrecta)  {      
      this.RespuestaColor.push("bg-color-green");
      resulta = true;
    } else this.RespuestaColor.push("bg-color-red");*/

    this.RespuestasCorrecta[Pregunta] = resulta;
  } 

  ColorRespuesta(value){    
    return this.RespuestaColor[value];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  SendResult(){
    let data:Observable<any>;
    let Param:string;

    let Incorrectas = this.ToalPreguntas - this.ToalCorrectas;
    let Alumno = this.GetAlumnoName();
    Param = 'http://www.tecnoavl.com/movil/testmail.php';
    Param = Param + '?Alumno=' + Alumno + '&materia=' + this.Materia;
    Param = Param + '&cantPreguntas=' + this.ToalPreguntas;
    Param = Param + '&cantPregCorrectas=' + this.ToalCorrectas;
    Param = Param + '&cantPregInicorrectas=' + Incorrectas;
    Param = Param + '&Duracion=60';
    
    /*Alumno
    materia
    cantPreguntas
    cantPregCorrectas
    cantPregInicorrectas
    Duracion*/
    data = this.http.get(Param);    
      data.subscribe(result => {
        console.log(result);
      })

      this.navCtrl.push(HomePage);
    
     
  }

  GetAlumnoName(){
    return this.JermSoft.GetNameLic();
  }

  doRefresh(){
    console.log('ionViewDidLoad doRefresh');
  }

}
