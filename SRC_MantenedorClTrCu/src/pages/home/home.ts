import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  { MtrabajadoresPage } from '../mtrabajadores/mtrabajadores';
import { RestProvider }     from '../../providers/rest/rest';
import { MclientesPage } from '../mclientes/mclientes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios:any;

  constructor(public navCtrl: NavController , public http : RestProvider) {

  }

  PaginaTrabajadores(){
    this.navCtrl.push(MtrabajadoresPage);
  }
  PaginaClientes(){
    this.navCtrl.push(MclientesPage);
  }

}
