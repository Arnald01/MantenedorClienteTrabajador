import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalTrPage } from './modal-tr';

@NgModule({
  declarations: [
    ModalTrPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalTrPage),
  ],
})
export class ModalTrPageModule {}
