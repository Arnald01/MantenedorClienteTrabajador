import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { Validators , FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClientServiceProvider } from '../../providers/client-service/client-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the ModiClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modi-cliente',
  templateUrl: 'modi-cliente.html',
})
export class ModiClientePage {
  private todo : FormGroup;
  cliente:any;
  original :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
    private AlertCtrl : AlertController , private http : ClientServiceProvider) {
      this.cliente = navParams.get('cliente');
    this.todo = this.formBuilder.group({
      cod_cliente:[],
      correo:['',[Validators.required,Validators.email]],
      nombre:['',[Validators.required,Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
      apellido:['',[Validators.maxLength(30),Validators.pattern(/^[a-z|A-Z]+$/)]],
      fono:['',[Validators.pattern(/^[+ 0-9 | \s]+$/),Validators.minLength(8),Validators.maxLength(12)]],  
      mas:[false],
      fem:[false],
      otro:[false],
      sexo:['',[Validators.required,Validators.pattern(/^[F|M|O|f|m|o]$/)]],
      contrasena:['',[Validators.required,Validators.pattern(/^[0-9a-zA-Z].{6,18}$/)]],
      contrasena2:[],
      origin:[]
    });
    this.todo.controls['cod_cliente'].setValue(this.cliente.cod_cliente);
    this.todo.controls['correo'].setValue(this.cliente.correo);
    this.todo.controls['nombre'].setValue(this.cliente.nombre);
    this.todo.controls['apellido'].setValue(this.cliente.apellido);
    this.todo.controls['fono'].setValue(this.cliente.fono);
    this.todo.controls['sexo'].setValue(this.cliente.sexo);
    this.todo.controls['contrasena'].setValue(this.cliente.contrasena);
    this.todo.controls['contrasena2'].setValue(this.cliente.contrasena);
    this.original = this.cliente.correo; 
    this.todo.controls['contrasena2'].setValidators([Validators.required, this.verifpass.bind(this.todo)]);
    this.todo.controls['mas'].setValidators(this.VALCHECKMASC.bind(this.todo))
    this.todo.controls['fem'].setValidators(this.VALCHECKFEM.bind(this.todo))
    this.todo.controls['otro'].setValidators(this.VALCHECKESOTHER.bind(this.todo))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModiClientePage');
  }

  Update(todo){
    let aux = todo.controls['sexo'].value;
    this.todo.controls['sexo'].setValue(aux.toUpperCase());
    this.todo.controls['origin'].setValue(this.original);
    console.log(todo.value);  
    this.http.UpdateTrabajador(todo.value).subscribe(resp =>{
      console.log(resp);
      this.MostrarAlerta(resp);
      this.navCtrl.popTo(HomePage);
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
  //VALIDACIONES DE FORMULARIO
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
