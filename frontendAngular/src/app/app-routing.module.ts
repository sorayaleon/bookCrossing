import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HomeComponent } from './components/home/home.component';
import { AntesInicioSesionService } from './Services/antes-inicio-sesion.service';
import { SesionIniciadaService } from './Services/sesion-iniciada.service';
import { GestionEstablecimientosComponent } from './components/establecimiento/gestion-establecimientos/gestion-establecimientos.component';
import { CreateEstablecimientoComponent } from './components/establecimiento/create-establecimiento/create-establecimiento.component';
import { UpdateEstablecimientoComponent } from './components/establecimiento/update-establecimiento/update-establecimiento.component';
import { FichaEstablecimientoComponent } from './components/establecimiento/ficha-establecimiento/ficha-establecimiento.component';
import { FichaLibroComponent } from './components/libro/ficha-libro/ficha-libro.component';
import { CreateLibroComponent } from './components/libro/create-libro/create-libro.component';
import { UpdateLibroComponent } from './components/libro/update-libro/update-libro.component';
import { GestionLibrosComponent } from './components/libro/gestion-libros/gestion-libros.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RefreshComponent } from './refresh/refresh.component';
import { SolicitudComponent } from './components/establecimiento/solicitud/solicitud.component';
import { VistaUsuarioComponent } from './components/libro/vista-usuario/vista-usuario.component';
import { UsuarioEstablecimientoComponent } from './components/establecimiento/usuario-establecimiento/usuario-establecimiento.component';
import { AceptarPrestamoComponent } from './components/prestamo/aceptar-prestamo/aceptar-prestamo.component';
import { SolicitudEstablecimientoComponent } from './components/establecimiento/solicitud-establecimiento/solicitud-establecimiento.component';
import { DevolucionPrestamoComponent } from './components/prestamo/devolucion-prestamo/devolucion-prestamo.component';
import { DevolucionComponent } from './components/prestamo/devolucion/devolucion.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { VerIncidenciaComponent } from './components/ver-incidencia/ver-incidencia.component';
import { RetrasoComponent } from './components/libro/retraso/retraso.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AntesInicioSesionService]},
  {path: 'registro', component: RegistroComponent, canActivate: [AntesInicioSesionService]},
  {path: 'home', component: HomeComponent, canActivate: [SesionIniciadaService]},
  {path: 'requestPass', component: RequestResetComponent, canActivate: [AntesInicioSesionService]},
  {path: 'responsePass', component: ResponseResetComponent, canActivate: [AntesInicioSesionService]},
  {path: 'gestionEstablecimientos', component: GestionEstablecimientosComponent, canActivate: [SesionIniciadaService]},
  {path: 'createEstablecimiento', component: CreateEstablecimientoComponent, canActivate: [SesionIniciadaService]},
  {path: 'updateEstablecimiento/:id', component: UpdateEstablecimientoComponent, canActivate: [SesionIniciadaService]},
  {path: 'fichaEstablecimiento/:id', component: FichaEstablecimientoComponent, canActivate: [SesionIniciadaService]},
  {path: 'fichaLibro/:id', component: FichaLibroComponent, canActivate: [SesionIniciadaService]},
  {path: 'createLibro', component: CreateLibroComponent, canActivate: [SesionIniciadaService]},
  {path: 'updateLibro/:id', component: UpdateLibroComponent, canActivate: [SesionIniciadaService]},
  {path: 'gestionLibros', component: GestionLibrosComponent, canActivate: [SesionIniciadaService]},
  {path: 'perfil/:id', component: PerfilComponent, canActivate: [SesionIniciadaService]},
  {path: 'refresh', component: RefreshComponent, canActivate: [SesionIniciadaService]},
  {path: 'gestionSolicitudes', component: SolicitudComponent, canActivate: [SesionIniciadaService]},
  {path: 'gestionUsuarios', component: RefreshComponent, canActivate: [SesionIniciadaService]},
  {path: 'gestionPrestamos', component: AceptarPrestamoComponent, canActivate: [SesionIniciadaService]},
  {path: 'devolucionPrestamo', component: DevolucionPrestamoComponent, canActivate: [SesionIniciadaService]},
  {path: 'devolucion/:id', component: DevolucionComponent, canActivate: [SesionIniciadaService]},
  {path: 'vistaLibro/:id', component: VistaUsuarioComponent, canActivate: [SesionIniciadaService]},
  {path: 'vistaEstablecimiento/:id', component: UsuarioEstablecimientoComponent, canActivate: [SesionIniciadaService]},  
  {path: 'serColaborador', component: SolicitudEstablecimientoComponent, canActivate: [SesionIniciadaService]},
  {path: 'incidencia', component: IncidenciaComponent, canActivate: [SesionIniciadaService]},
  {path: 'incidencia/:id', component: VerIncidenciaComponent, canActivate: [SesionIniciadaService]},
  {path: 'retraso', component: RetrasoComponent, canActivate: [SesionIniciadaService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
