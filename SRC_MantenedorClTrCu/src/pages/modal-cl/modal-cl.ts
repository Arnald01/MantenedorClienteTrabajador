import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalClPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-cl',
  templateUrl: 'modal-cl.html',
})
export class ModalClPage {

  cliente:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl:ViewController) {
    this.cliente = navParams.get('cliente');
  }

  ionViewDidLoad() {
    console.log(this.cliente);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
