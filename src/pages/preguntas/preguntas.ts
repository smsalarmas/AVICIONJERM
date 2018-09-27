import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { ResultadoPage } from '../resultado/resultado';
import { Storage } from '@ionic/storage';

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
  public PreguntaIndex:number = 1;
  public radio: any;
  public SiguenteActive:boolean;
  public BoolRespCorrecta:boolean;

  userData = {
    TimeByPreguntas: 0,
    CantPreguntas:0
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private storage: Storage,
    public http: HttpClient) {
    let data:Observable<any>;

    this.Id = this.navParams.get('id');
    this.Mat = this.navParams.get('Mat');
    this.Materia = this.navParams.get('Materia');
    this.PreguntaActual = 1;
    this.RespuestaCorrecta = 0;
    this.SiguenteActive = true;

    
    this.StorageGet('TimeByPreguntas', this.userData.TimeByPreguntas);

    data = this.http.get('/assets/json/' + this.navParams.get('Mat') + '/_' + this.Id + '.json');    
      data.subscribe(result => {        
         
        this.items = result;
        this.StorageGet('CantPreguntas', this.userData.CantPreguntas);
        this.ToalPreguntas = this.items.length;
        if (this.ToalPreguntas  > this.userData.CantPreguntas) this.ToalPreguntas = this.userData.CantPreguntas;
        
        for (var i=1;i<this.ToalPreguntas;i++)
        {
          this.StatusMostrar.push(false);
        }
        console.log(JSON.stringify(result));
      })

       
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntasPage');
  }

  SiguentePregunta(){        
    this.StatusMostrar[this.PreguntaIndex] = true;
    this.StatusMostrar[this.PreguntaIndex-1] = false;
    this.PreguntaIndex = this.PreguntaIndex + 1;     
    if (this.ToalPreguntas === this.PreguntaIndex)
    {
      this.navCtrl.push(ResultadoPage);
    }
    this.SiguenteActive = true;
    
  }

  StorageGet(Key: string, Default: any) {

    return new Promise((resolve, reject) => {
        this.storage.get(Key).then((data) => {
            console.log(" Storage.get ", Key, data);
            if (Key === 'TimeByPreguntas') this.userData.TimeByPreguntas = data.toString();
            if (Key === 'CantPreguntas') this.userData.CantPreguntas = data.toString();
             
            resolve(data);
        })
            .catch(() => {
                console.log(" Load DEFAULTS", Default);
                resolve(Default);
            });
    });
  }

  SelectOP(RepCorrecta:number){
    this.SiguenteActive = false;
    let Buscar:string;
    if (RepCorrecta == 1)   Buscar = "A";
    if (RepCorrecta == 2)   Buscar = "B";
    if (RepCorrecta == 3)   Buscar = "C";
    if (RepCorrecta == 4)   Buscar = "D";
    if (RepCorrecta == 5)   Buscar = "E";
    this.BoolRespCorrecta = false;
    var n = JSON.stringify(this.radio).search(Buscar);
    if (n != -1) {
      this.RespuestaCorrecta = this.RespuestaCorrecta + 1;
      this.BoolRespCorrecta = true;
    }
    
     
  }

 

}
