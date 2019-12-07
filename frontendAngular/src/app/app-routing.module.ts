import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HomeComponent } from './components/home/home.component';
import { AntesInicioSesionService } from './Services/antes-inicio-sesion.service';
import { SesionIniciadaService } from './Services/sesion-iniciada.service';

const routes: Routes = [

  {path: 'login', component: LoginComponent, canActivate: [AntesInicioSesionService]},
  {path: 'registro', component: RegistroComponent, canActivate: [AntesInicioSesionService]},
  {path: 'home', component: HomeComponent, canActivate: [SesionIniciadaService]},
  {path: 'requestPass', component: RequestResetComponent, canActivate: [AntesInicioSesionService]},
  {path: 'responsePass', component: ResponseResetComponent, canActivate: [SesionIniciadaService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
