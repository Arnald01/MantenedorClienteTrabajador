import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalClPage } from './modal-cl';

@NgModule({
  declarations: [
    ModalClPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalClPage),
  ],
})
export class ModalClPageModule {}
