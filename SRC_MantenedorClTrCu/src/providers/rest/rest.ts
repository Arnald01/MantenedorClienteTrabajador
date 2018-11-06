import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operator/map';

//import { datos } from '../rest/datos';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()


  
export class RestProvider {
  
   api : string = 'http://localhost/php/';
   
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }  
    

  obtenercuentas(){
    //return this.http.get(this.api+'obtener.php');
    return this.http.get(this.api+'obtener.php');
  }
  //ultimo
  BuscarUser(rut:string):Observable<any>{
      return this.http.post(this.api+'buscar.php' , JSON.stringify(rut));
  }
  guardarTrabajador(trabajador){
    console.log("REST")
    console.log(trabajador);
    //let data = JSON.stringify(trabajador);
   return this.http.post(this.api+'ingresarTrabajador.php', JSON.stringify(trabajador) );
  } 

  EliminarTrabajador(correo){
    return this.http.post(this.api+'eliminarTrabajador.php',JSON.stringify(correo));
  }
 
  UpdateTrabajador(todo){
    return this.http.post(this.api+'Modificar.php', JSON.stringify(todo));
  }
}
