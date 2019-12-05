import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'requestPass', component: RequestResetComponent},
  {path: 'responsePass', component: ResponseResetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
