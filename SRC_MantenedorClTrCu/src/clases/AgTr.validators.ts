import { AbstractControl , ValidatorFn , Validators, FormControl } from '@angular/forms';
import { RestProvider } from '../providers/rest/rest';
import { ClientServiceProvider } from '../providers/client-service/client-service';


export class AgTrValid{

        static valorUnico(servicio:RestProvider):ValidatorFn{
            return (control:AbstractControl):{[key:string]:any} =>{
                if(this.isPresent(Validators.required(control))) return null;

                var v = control.value;
                console.log(v);
                return new Promise( (resolve , reject) => {
                    servicio.BuscarUser(v).subscribe(
                        data =>{
                            if(data.length > 0 ){
                                resolve ({valorUnico:true});
                            }else{  console.log(data);
                                    resolve (null);}
                        },
                            err => resolve({valorUnico:true})
                    )
                })
            }
        }   
            //PARA EL TRABAJADOR

            //EMAIL UNICO

        static emailUnico(servicio:ClientServiceProvider):ValidatorFn{
            return (control:AbstractControl):{[key:string]:any} =>{
                if(this.isPresent(Validators.required(control))) return null;

                var v = control.value;
                console.log(v);
                return new Promise( (resolve , reject) => {
                    servicio.BuscarUser(v).subscribe(
                        data =>{
                            if(data.length > 0 ){
                                resolve ({emailUnico:true});
                            }else{  console.log(data);
                                    resolve (null);}
                        },
                            err => resolve({emailUnico:true})
                    )
                })
            }
        } 


        static isPresent(obj:any) : boolean{
            return obj ! == undefined && obj !== null;
        }

        // VALIDACIONES SINCRONAS

        //VERIFICACION DE LA PASSWORD


}