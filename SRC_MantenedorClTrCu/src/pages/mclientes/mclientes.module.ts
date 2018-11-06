import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MclientesPage } from './mclientes';

@NgModule({
  declarations: [
    MclientesPage,
  ],
  imports: [
    IonicPageModule.forChild(MclientesPage),
  ],
})
export class MclientesPageModule {}
