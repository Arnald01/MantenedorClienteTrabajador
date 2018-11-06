import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModiClientePage } from './modi-cliente';

@NgModule({
  declarations: [
    ModiClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ModiClientePage),
  ],
})
export class ModiClientePageModule {}
