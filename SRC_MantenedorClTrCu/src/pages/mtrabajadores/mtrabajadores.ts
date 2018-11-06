import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ModalController ,ViewController , Platform} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ModifTrabajadorPage } from '../modif-trabajador/modif-trabajador';
import { Validators , FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AgTrValid } from '../../clases/AgTr.validators';
import { ModalTrPage } from '../modal-tr/modal-tr';






/**
 * Generated class for the MtrabajadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mtrabajadores',
  templateUrl: 'mtrabajadores.html',
})
export class MtrabajadoresPage {
  trabajador :any;
  datos : any;
  private todo :FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private AlertCtrl : AlertController
  ,private http : RestProvider,private formBuilder: FormBuilder , public modalCtrl : ModalController) {

    this.todo = this.formBuilder.group({
      rut:['',[Validators.required,this.VALIDARUT.bind(this.todo),Validators.pattern(/^[0-9kK]+$/)],[AgTrValid.valorUnico(this.http)]],   //this.validauserasync
      correo:['',[Validators.required,Validators.email]],
      nombre:['',[Validators.required,Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
      apellido:['',[Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
      fono:['',[Validators.pattern(/^[+ 0-9 | \s]+$/),Validators.minLength(8),Validators.maxLength(12)]],
      Descripcion:[],
      fecha_creacion:[],  
      tipo_cuenta:['',[Validators.required,Validators.pattern(/^[E|R|e|r]$/)]],
      Esteticista:[false],
      Recepcionista:[false],
      contrasena:['',[Validators.required,Validators.pattern(/^[0-9a-zA-Z].{6,18}$/)]],
      contrasena2:['',[Validators.required,Validators.pattern(/^[0-9a-zA-Z].{6,18}$/)]]
    })

    this.todo.controls['contrasena2'].setValidators([Validators.required, this.verifpass.bind(this.todo)])
    this.todo.controls['Esteticista'].setValidators(this.VALCHECKESTILISTA.bind(this.todo))
    this.todo.controls['Recepcionista'].setValidators(this.VALCHECKRECEPCIONISTA.bind(this.todo))
  }

  ngAfterViewInit () {
   
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MtrabajadoresPage');
  }
  Listar(){
    this.http.obtenercuentas().subscribe(
      (res) => {
        this.trabajador = res;
        console.log(this.trabajador);
      },
        (error) =>{
          console.log(error);
        }
    )
  }

//ELIMINAR TRABAJADOR
  Eliminar(correo){
    console.log(correo);
    this.http.EliminarTrabajador(correo).subscribe((nuevotrabajador) => {
      this.datos = (nuevotrabajador);
      console.log(this.datos);
      this.MostrarAlerta(this.datos);
      this.Listar();
    });
  }
  MostrarAlerta(respuesta){
    if(respuesta.mensaje == "exitoso!"){
      let alert = this.AlertCtrl.create({
        title:"Informacion",
        subTitle:"Eliminacion",
        message: "Los datos fueron eliminados de manera correcta!",
        buttons: ['Aceptar']
      });
      alert.present();
    }else{
      let alert = this.AlertCtrl.create({
        title:"Error",
        subTitle:"Eliminacion Fallida!",
        message: "Este correo ya se encuentra registrado, Intente con otro",
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }
  //MODIFICAR TRABAJADOR
  Modificar(trabajador){
    this.navCtrl.push(ModifTrabajadorPage,{trabajador});
  }


  //AGREGAR TRABAJADOR
  Guardar(todo:FormGroup){
    // FORMAR CADENA DE FECHA ACTUAL
      var f = new Date();
      var fecha = f.getDate();
      var mm = f.getMonth(); //January is 0!
      var yyyy = f.getFullYear();
     if(mm == 9){ 
      mm = mm +1;
     }
     if(fecha<10){
         var dia = '0'+fecha;
     }else{
       dia = ''+fecha; 
     }
     if(mm<10){
        var mes = '0' + mm; 
        var fecha_formt = yyyy +'/' + mes +'/'+ dia;
      }else{
        fecha_formt = yyyy +'/' + mm +'/'+ dia;
      }

      //ASIGNACION DE VALORES A CAMPO FECHA
      
      todo.controls['fecha_creacion'].setValue(fecha_formt);
      //console.log(todo.controls['fecha_creacion'].value);
      //console.log("----");
      //ASIGNACION DE VALORES A CAMPO TIPO CUENTA
      let valE = todo.controls['Esteticista'].value;
      let valR = todo.controls['Recepcionista'].value;
        if(valE == true){
           todo.controls['tipo_cuenta'].setValue("E");
        }else if(valR == true){
           todo.controls['tipo_cuenta'].setValue("R");
        }
          console.log(todo.controls['rut'].value);
      this.http.guardarTrabajador(todo.value).subscribe((nuevotrabajador) => {
        this.datos = (nuevotrabajador);
        console.log(this.datos);
        this.MostrarAlertaAgr(this.datos);
        this.navCtrl.pop();
     });
 }

 MostrarAlertaAgr(respuesta){
  if(respuesta.mensaje == "exitoso!"){
    let alert = this.AlertCtrl.create({
      title:"Informacion",
      subTitle:"Registro Exitoso!",
      message: "Los datos fueron registrados de manera correcta!",
      buttons: ['Aceptar']
    });
    alert.present();
  }else{
    let alert = this.AlertCtrl.create({
      title:"Error",
      subTitle:"Registro Fallido!",
      message: respuesta.mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
// ABRIR VENTANA DE TRABAJADORES
  openModal(trabajador){
    let modal = this.modalCtrl.create(ModalTrPage ,{trabajador});
    modal.present();
  }



//--------------------------------------VALIDACIONES FORMULARIO-----------------------------
verifpass(control:FormControl):{ [s:string] : boolean}{
  let forma:any = this;
  if( control.value !== forma.controls['contrasena'].value){
  return { verifpass : true}
   }
return null;
}

//VALIDACIONES CHEXBOX
VALCHECKESTILISTA(control:FormControl){
let forma: any = this;
if(control.value== true && forma.controls['Recepcionista'].value==false){
 forma.controls['tipo_cuenta'].setValue("E");
 forma.controls['Recepcionista'].disable();
} else if(control.value == false && forma.controls['Recepcionista'].enabled == false){
forma.controls['tipo_cuenta'].setValue("");
forma.controls['Recepcionista'].enable();
} else{
 return null
}
}

VALCHECKRECEPCIONISTA(control:FormControl){
let forma: any = this;
if(control.value== true && forma.controls['Esteticista'].value==false){
 forma.controls['tipo_cuenta'].setValue("R");
 forma.controls['Esteticista'].disable();
} else if(control.value == false && forma.controls['Esteticista'].enabled == false){
 forma.controls['tipo_cuenta'].setValue("");
forma.controls['Esteticista'].enable();
}else{
 return null
}
}
//VALIDAR RUT

VALIDARUT(control:FormControl){
 var val:string = control.value;
 if (val.length > 7){ 
  let rut:string = control.value;
  //Despejar Puntos
  var valor:any = rut.replace('.',''); 
  //Despejar Guion 
  valor = valor.replace('-','');
  //Aislar Cuerpo y digito verificador
  let Cuerpo=valor.slice(0,-1);
  let dv  = valor.slice(-1).toUpperCase();
  // calcular digito verificador
  let suma = 0;
  let multipo= 2;
  //para cada digito del cuerpo
  for (let i=1; i<=Cuerpo.length;i++){
      //obtener producto con el multiplo correspondiente
        let index = multipo * valor.charAt(Cuerpo.length - i); 
      //sumar contador general
        suma = suma + index;
      //consolidar numero dentro del rango
      if (multipo<7){
        multipo = multipo +1;
      } else {
        multipo = 2;
      }
  } 
  //Caluclar Digito Verficador en base al modulo 11 
    let dvEsperado = 11 - (suma%11);
    //casos especiales
    dv= (dv=='K')?10:dv;
    dv= (dv== 0)?11:dv;

    //validar que el cuerpo coincida con su digito verificador
    if(dvEsperado != dv){
      return {asd:true};
    }else{
      control.setValue(Cuerpo);
      return null;
    }
  }  
}
}
