import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the ClientServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientServiceProvider {

  api : string = 'http://localhost/php/Cliente/';
  
  constructor(public http: HttpClient) {
    console.log('Hello ClientServiceProvider Provider');
  }
  obtenercuentas(){
    //return this.http.get(this.api+'obtener.php');
    return this.http.get(this.api+'obtener.php');
  }
  //ultimo
  BuscarUser(correo:string):Observable<any>{
      return this.http.post(this.api+'buscar.php' , JSON.stringify(correo));
  }
  RegistrarCLiente(cliente){
    console.log("REST")
    console.log(cliente);
    //let data = JSON.stringify(trabajador);
   return this.http.post(this.api+'ingresarCliente.php', JSON.stringify(cliente));
  } 

  EliminarCliente(correo){
    return this.http.post(this.api+'eliminarCliente.php',JSON.stringify(correo));
  }
 
  UpdateTrabajador(todo){
    return this.http.post(this.api+'Modificar.php', JSON.stringify(todo));
  }
}

    

 

