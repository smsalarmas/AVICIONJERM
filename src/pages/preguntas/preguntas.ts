import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { ResultadoPage } from '../resultado/resultado';
import { JermSoftProvider } from '../../providers/jerm-soft/jerm-soft';

/*
 * Generated class for the PreguntasPage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preguntas',
  templateUrl: 'preguntas.html',
})
export class PreguntasPage {
  public Id:string;     //Indica el ID de la pregunta, Ej: _1.json solo retorna 1
  public Mat:string;    //Indica la carpeta del json
  public Materia:string;
  public PreguntaActual:number;
  public ToalPreguntas:number;
  public TimerRespuesta:number;
  public Pregunta:any;
  public items:any;
  public RespuestaCorrecta:number;
  public StatusMostrar:boolean[] = [true]; //Controla el Show o Hidden de las preguntas
  public Respuestas:number[] = [0];
  public PreguntaIndex:number = 1;
  public radio: any;
  public SiguenteActive:boolean;
  public BoolRespCorrecta:boolean;
  public BgColor:string = "";
  public maxTime: number = 60;
  public timer:number;
  public ColorTime:string = "circle_main";
  private TimeByPreguntas: number;
  
  dataConfig = {
    TimeByPreguntas:0,
    CantPreguntas:0
  };
  mColor = {
    A:'',
    B:'',
    C:'',
    D:'',
    E:''
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public JermSoft: JermSoftProvider,
    public http: HttpClient) {
    let data:Observable<any>;

    this.Id = this.navParams.get('id');
    this.Mat = this.navParams.get('Mat');
    this.Materia = this.navParams.get('Materia');
    this.PreguntaActual = 1;
    this.RespuestaCorrecta = 0;
    this.SiguenteActive = true;

    
    //this.StorageGet('TimeByPreguntas', this.userData.TimeByPreguntas);

      data = this.http.get('/assets/json/' + this.navParams.get('Mat') + '/_' + this.Id + '.json');    
      data.subscribe(result => {        
         
        this.items = result;
        this.dataConfig.CantPreguntas = this.JermSoft.GetCantPreguntas();
        this.dataConfig.TimeByPreguntas = this.JermSoft.GetTime();

        this.ToalPreguntas = this.items.length;
        if (this.dataConfig.CantPreguntas == 0) this.dataConfig.CantPreguntas = 5
        if (this.ToalPreguntas  > this.dataConfig.CantPreguntas) this.ToalPreguntas = this.dataConfig.CantPreguntas;
        if (this.ToalPreguntas == 0) this.ToalPreguntas = 5

        for (var i=1;i<this.ToalPreguntas;i++)
        {
          this.StatusMostrar.push(false);
          this.Respuestas.push(0);
        }
        console.log(JSON.stringify(result));
      })
      if (this.dataConfig.TimeByPreguntas > 0) this.TimeByPreguntas = this.dataConfig.TimeByPreguntas;
      else this.TimeByPreguntas = 60

      this.maxTime = 60;
      this.StartTimer();
      console.log(this.maxTime);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntasPage' + this.TimeByPreguntas);
  }

  SiguentePregunta(){        
    this.maxTime = this.dataConfig.TimeByPreguntas;
    this.StartTimer();

    this.StatusMostrar[this.PreguntaIndex] = true;
    this.StatusMostrar[this.PreguntaIndex-1] = false;
    this.PreguntaIndex = this.PreguntaIndex + 1;   
    this.mColor.A = "BgColorb"; 
    this.mColor.B = "BgColorb"; 
    this.mColor.C = "BgColorb"; 
    this.mColor.D = "BgColorb"; 
    this.mColor.E = "BgColorb";  
    if (this.PreguntaIndex > this.ToalPreguntas)
    {
      //this.JermSoft.SetRespuestas(this.Respuestas);
      this.navCtrl.push(ResultadoPage, {id:this.Id,Mat:this.Mat,Materia:this.Materia,respuestas:this.Respuestas,totalpregun:this.ToalPreguntas});
    }
    this.SiguenteActive = true;    
  }

  

  SelectOP(RepCorrecta:number){
      this.SiguenteActive = false;
      let Buscar:string;
      this.Respuestas[this.PreguntaIndex] = RepCorrecta;

      if (RepCorrecta == 1) {  Buscar = "A"; this.mColor.A = "BgColor2";}
      if (RepCorrecta == 2) {  Buscar = "B"; this.mColor.B = "BgColor2";}
      if (RepCorrecta == 3) {  Buscar = "C"; this.mColor.C = "BgColor2";}
      if (RepCorrecta == 4) {  Buscar = "D"; this.mColor.D = "BgColor2";}
      if (RepCorrecta == 5) {  Buscar = "E"; this.mColor.E = "BgColor2";}
      this.BoolRespCorrecta = false;
      this.BgColor = "BgColor";
      var n = JSON.stringify(this.radio).search(Buscar);
      if (n != -1) {
        this.RespuestaCorrecta = this.RespuestaCorrecta + 1;
        this.BoolRespCorrecta = true;
        this.BgColor = "BgColor2";
        
      }
  }

  

  StartTimer(){
    this.timer = setTimeout(x => 
      {
        if (this.SiguenteActive === true){
          if(this.maxTime <= 0) { }
          this.maxTime -= 1;

          if(this.maxTime>10) this.ColorTime  = "circle_main";
          else  this.ColorTime  = "circle_main2";

          if(this.maxTime>0){
            this.SiguenteActive = true;
            this.StartTimer();
          }
          
          else{
            this.SiguenteActive = false;
            this.ColorTime  = "circle_main";
          }
        }
          

      }, 1000);
 

  }
  showMessageSuccess(){     
    this.SiguenteActive = false;

    setTimeout(function(){
      this.SiguenteActive = true;
    },10000);

  }

 

}
