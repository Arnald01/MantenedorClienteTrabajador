import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MtrabajadoresPage } from '../pages/mtrabajadores/mtrabajadores';


import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { ModifTrabajadorPageModule } from '../pages/modif-trabajador/modif-trabajador.module';
import { ClientServiceProvider } from '../providers/client-service/client-service';
import { MclientesPageModule } from '../pages/mclientes/mclientes.module';
import { ModiClientePageModule } from '../pages/modi-cliente/modi-cliente.module';
import { ModalTrPageModule } from '../pages/modal-tr/modal-tr.module';
import { ModalClPageModule } from '../pages/modal-cl/modal-cl.module';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MtrabajadoresPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ModifTrabajadorPageModule,
    MclientesPageModule,
    ModiClientePageModule,
    ModalTrPageModule,
    ModalClPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MtrabajadoresPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    ClientServiceProvider,
  ]
})
export class AppModule {}
