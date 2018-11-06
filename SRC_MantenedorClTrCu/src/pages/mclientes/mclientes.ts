import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ModalController } from 'ionic-angular';
import { Validators , FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClientServiceProvider } from '../../providers/client-service/client-service';
import { AgTrValid } from '../../clases/AgTr.validators';
import { ModiClientePage } from '../modi-cliente/modi-cliente';
import { ModalClPage } from '../modal-cl/modal-cl';

/**
 * Generated class for the MclientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mclientes',
  templateUrl: 'mclientes.html',
})
export class MclientesPage {
  private todo : FormGroup;
  datos:any;
  cliente:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
    private AlertCtrl : AlertController , private http : ClientServiceProvider , public modalCtrl : ModalController) {

      this.todo = this.formBuilder.group({
        correo:['',[Validators.required,Validators.email],[AgTrValid.emailUnico(this.http)]],
        nombre:['',[Validators.required,Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
        apellido:['',[Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
        fono:['',[Validators.pattern(/^[+ 0-9 | \s]+$/),Validators.minLength(8),Validators.maxLength(12)]],
        tipo_cuenta:['C'],
        fecha_creacion:[],
        mas:[false],
        fem:[false],
        otro:[false],  
        sexo:['',[Validators.required,Validators.pattern(/^[M|F|O|m|o|f]$/)]],
        contrasena:['',[Validators.required,Validators.pattern(/^[0-9a-zA-Z].{6,18}$/)]],
        contrasena2:[]
      })
      this.todo.controls['contrasena2'].setValidators([Validators.required, this.verifpass.bind(this.todo)]);
      this.todo.controls['mas'].setValidators(this.VALCHECKMASC.bind(this.todo))
      this.todo.controls['fem'].setValidators(this.VALCHECKFEM.bind(this.todo))
      this.todo.controls['otro'].setValidators(this.VALCHECKESOTHER.bind(this.todo))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MclientesPage');
  }
  ListarClientes(){
     this.http.obtenercuentas().subscribe(
      (res) => {
        this.cliente = res;
        console.log(this.cliente);
      },
        (error) =>{
          console.log(error);
        }
    )
  }//FIN LISTAR TRABAJADOR

  Eliminar(correo){
    this.http.EliminarCliente(correo).subscribe((nuevocliente) => {
      this.datos = (nuevocliente);
      console.log(this.datos);
      this.MostrarAlertaEl(this.datos);
      this.ListarClientes();
      this.navCtrl.pop();
    });
  }//fiin eliminar
  MostrarAlertaEl(respuesta){
    if(respuesta.mensaje == "Eliminacion exitosa"){
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
        message: respuesta.mensaje,
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }//FIN ALERTA ELIMINACION

  Modificar(cliente){
    this.navCtrl.push(ModiClientePage,{cliente});
  }//MODIFICAR


  //AGREGAR CLIENTE ---
  Guardar(todo:FormGroup){
    var f = new Date();
       var fecha = f.getDate();
       var mm = f.getMonth(); //January is 0!
       var yyyy = f.getFullYear();
      if(mm == 9){ 
       mm = mm +1;
      }
      if(fecha<10){
          var dia = '/0'+fecha;
      }else{
         var dia = '/'+fecha;
      }
      if(mm<10){
         var mes = '0' + mm; 
         var fecha_formt = yyyy +'/' + mes + dia;
       }else{
        var fecha_formt = yyyy +'/' + mm + dia;
       }
       let ti = todo.controls['tipo_cuenta'].value;
       console.log()
       let aux = todo.controls['tipo_cuenta'].value; 
       todo.controls['tipo_cuenta'].setValue(aux.toUpperCase());
       todo.controls['fecha_creacion'].setValue(fecha_formt);
       console.log(todo.value);
       console.log("----");
    
           
      this.http.RegistrarCLiente(todo.value).subscribe((nuevotrabajador) => {
      this.datos = (nuevotrabajador);
      console.log(this.datos);
        this.MostrarAlertaAgr(this.datos);
        this.navCtrl.pop();
      });

  }//FIN GUARDAR TRABAJADOR

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
        message: "El correo ya se encuentra registrado!, intente con otro..",
        buttons: ['Aceptar']
      });
      alert.present();
    }
    
  }//FIN MOSTRAR ALERTA

  // ABRIR VENTANA DE TRABAJADORES
  openModal(cliente){
    let modal = this.modalCtrl.create(ModalClPage ,{cliente});
    modal.present();
  }


//-----------------------VALIDACIONES ----------------------------------------
  verifpass(control:FormControl):{ [s:string] : boolean}{
    let forma:any = this;
    if( control.value !== forma.controls['contrasena'].value){
      return { verifpass : true}
    }
    return null;
  }
  //VALIDACION CHEKBOXS
    //MASCULINO
  VALCHECKMASC(control : FormControl){
    let forma: any = this;
    if(control.value== true && forma.controls['fem'].value==false && forma.controls['otro'].value == false){
     forma.controls['sexo'].setValue("M");
     forma.controls['fem'].disable();
     forma.controls['otro'].disable();
    } else if(control.value == false && forma.controls['otro'].enabled == false && forma.controls['fem'].enabled == false){
    forma.controls['sexo'].setValue("");
    forma.controls['fem'].enable();
    forma.controls['otro'].enable();
    } else{
     return null
    } 
  }
   //FEMENINO
  VALCHECKFEM(control : FormControl){
    let forma: any = this;
    if(control.value== true && forma.controls['mas'].value==false && forma.controls['otro'].value == false){
     forma.controls['sexo'].setValue("F");
     forma.controls['mas'].disable();
     forma.controls['otro'].disable();
    } else if(control.value == false && forma.controls['otro'].enabled == false && forma.controls['mas'].enabled == false){
    forma.controls['sexo'].setValue("");
    forma.controls['mas'].enable();
    forma.controls['otro'].enable();
    } else{
     return null
    } 
  }
   //OTRO
  VALCHECKESOTHER(control : FormControl){
    let forma: any = this;
    if(control.value== true && forma.controls['fem'].value==false && forma.controls['mas'].value == false){
     forma.controls['sexo'].setValue("O");
     forma.controls['fem'].disable();
     forma.controls['mas'].disable();
    } else if(control.value == false && forma.controls['mas'].enabled == false && forma.controls['fem'].enabled == false){
    forma.controls['sexo'].setValue("");
    forma.controls['fem'].enable();
    forma.controls['mas'].enable();
    } else{
     return null
    } 
  }

}
