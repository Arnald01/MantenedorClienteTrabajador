import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalTrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-tr',
  templateUrl: 'modal-tr.html',
})
export class ModalTrPage {

   trabajador:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl:ViewController) {
    this.trabajador = navParams.get('trabajador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTrPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
