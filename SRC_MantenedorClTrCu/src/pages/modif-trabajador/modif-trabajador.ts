import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Validators , FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MtrabajadoresPage } from '../mtrabajadores/mtrabajadores';

/**
 * Generated class for the ModifTrabajadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modif-trabajador',
  templateUrl: 'modif-trabajador.html',
})
export class ModifTrabajadorPage {
  private todo : FormGroup;
  trabajador:any;
  original :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder
    , public http : RestProvider , private AlertCtrl : AlertController) {
    this.trabajador = navParams.get('trabajador');
    this.todo = this.formBuilder.group({
      rut:[],
      correo:['',[Validators.required,Validators.email]],
      nombre:['',[Validators.required,Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
      apellido:['',[Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
      fono:['',[Validators.pattern(/^[+ 0-9 | \s]+$/),Validators.minLength(8),Validators.maxLength(12)]],
      Descripcion:[],  
      tipo_cuenta:['',[Validators.required,Validators.pattern(/^[E|R|e|r]$/)]],
      Esteticista:[false],
      Recepcionista:[false],
      contrasena:['',[Validators.required,Validators.pattern(/^[0-9a-zA-Z].{6,18}$/)]],
      contrasena2:[],
      origin:[]
    });
    this.todo.controls['contrasena2'].setValidators([Validators.required, this.verifpass.bind(this.todo)]);
    this.todo.controls['rut'].setValue(this.trabajador.rut_trabajador);
    this.todo.controls['correo'].setValue(this.trabajador.correo);
    this.todo.controls['nombre'].setValue(this.trabajador.nombre);
    this.todo.controls['apellido'].setValue(this.trabajador.apellido);
    this.todo.controls['fono'].setValue(this.trabajador.fono);
    this.todo.controls['Descripcion'].setValue(this.trabajador.descripcion_propia);
    this.todo.controls['tipo_cuenta'].setValue(this.trabajador.tipo_cuenta);
    this.todo.controls['contrasena'].setValue(this.trabajador.contrasena);
    this.todo.controls['contrasena2'].setValue(this.trabajador.contrasena);
    this.original = this.trabajador.correo; 
    this.todo.controls['Esteticista'].setValidators(this.VALCHECKESTILISTA.bind(this.todo))
    this.todo.controls['Recepcionista'].setValidators(this.VALCHECKRECEPCIONISTA.bind(this.todo))

      if(this.todo.controls['tipo_cuenta'].value == "E"){
        this.todo.controls['Esteticista'].setValue(true);
      }else{
        this.todo.controls['Recepcionista'].setValue(true);
      }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifTrabajadorPage');
  }

  Update(todo){
    let aux = todo.controls['tipo_cuenta'].value;
    this.todo.controls['tipo_cuenta'].setValue(aux.toUpperCase());
    this.todo.controls['origin'].setValue(this.original);
    this.http.UpdateTrabajador(todo.value).subscribe(resp =>{
      console.log(resp);
      this.MostrarAlerta(resp);
      this.navCtrl.popTo(MtrabajadoresPage);
    })
  }//FIN UPDATE  
  
  MostrarAlerta(respuesta){
    console.log(respuesta);
    if(respuesta == "Exito"){
      let alert = this.AlertCtrl.create({
        title:"Informacion",
        subTitle:"Registro Exitoso!",
        message: "Los datos fueron modificados de manera correcta!",
        buttons: ['Aceptar']
      });
      alert.present();
    }
    if(respuesta == "Existe"){
      let alert = this.AlertCtrl.create({
        title:"Error",
        subTitle:"Modificacion Fallida!",
        message: "El correo que desea ingresar ya existe!",
        buttons: ['Aceptar']
      });
      alert.present();
    }
    
  }

  //-----------------------------VALIDACIONES----------------------
//VERIFICACION DE LA PASSWORD
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



}
