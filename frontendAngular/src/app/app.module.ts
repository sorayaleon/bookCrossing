import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/template/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SesionIniciadaService } from './Services/sesion-iniciada.service';
import { AntesInicioSesionService } from './Services/antes-inicio-sesion.service';
import { CreateEstablecimientoComponent } from './components/establecimiento/create-establecimiento/create-establecimiento.component';
import { GestionEstablecimientosComponent } from './components/establecimiento/gestion-establecimientos/gestion-establecimientos.component';
import { UpdateEstablecimientoComponent } from './components/establecimiento/update-establecimiento/update-establecimiento.component';
import { RefreshComponent } from './refresh/refresh.component';
import { FichaEstablecimientoComponent } from './components/establecimiento/ficha-establecimiento/ficha-establecimiento.component';
import { CreateLibroComponent } from './components/libro/create-libro/create-libro.component';
import { UpdateLibroComponent } from './components/libro/update-libro/update-libro.component';
import { FichaLibroComponent } from './components/libro/ficha-libro/ficha-libro.component';
import { GestionLibrosComponent } from './components/libro/gestion-libros/gestion-libros.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { LibroPipe } from './pipes/libro.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EstablecimientoPipe } from './pipes/establecimiento.pipe';
import { SolicitudComponent } from './components/establecimiento/solicitud/solicitud.component';
import { VistaUsuarioComponent } from './components/libro/vista-usuario/vista-usuario.component';
import { UsuarioEstablecimientoComponent } from './components/establecimiento/usuario-establecimiento/usuario-establecimiento.component';
import { NavbarAdminComponent } from './components/template/navbar-admin/navbar-admin.component';
import { NavbarResponsableComponent } from './components/template/navbar-responsable/navbar-responsable.component';
import { NavbarUsuarioComponent } from './components/template/navbar-usuario/navbar-usuario.component';
import { DevolucionPrestamoComponent } from './components/prestamo/devolucion-prestamo/devolucion-prestamo.component';
import { AceptarPrestamoComponent } from './components/prestamo/aceptar-prestamo/aceptar-prestamo.component';
import { SolicitudEstablecimientoComponent } from './components/establecimiento/solicitud-establecimiento/solicitud-establecimiento.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DevolucionComponent } from './components/prestamo/devolucion/devolucion.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { VerIncidenciaComponent } from './components/ver-incidencia/ver-incidencia.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { GestionUsuariosComponent } from './components/usuarios/gestion-usuarios/gestion-usuarios.component';
import { FichaUsuariosComponent } from './components/usuarios/ficha-usuarios/ficha-usuarios.component';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    RequestResetComponent,
    ResponseResetComponent,
    HomeComponent,
    CreateEstablecimientoComponent,
    GestionEstablecimientosComponent,
    UpdateEstablecimientoComponent,
    RefreshComponent,
    FichaEstablecimientoComponent,
    CreateLibroComponent,
    UpdateLibroComponent,
    FichaLibroComponent,
    GestionLibrosComponent,
    PerfilComponent,
    MatConfirmDialogComponent,
    LibroPipe,
    EstablecimientoPipe,
    SolicitudComponent,
    VistaUsuarioComponent,
    UsuarioEstablecimientoComponent,
    NavbarAdminComponent,
    NavbarResponsableComponent,
    NavbarUsuarioComponent,
    DevolucionPrestamoComponent,
    AceptarPrestamoComponent,
    SolicitudEstablecimientoComponent,
    DevolucionComponent,
    IncidenciaComponent,
    VerIncidenciaComponent,
    ConfirmEmailComponent,
    GestionUsuariosComponent,
    FichaUsuariosComponent,
    IndexComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    MatDialog,
    MaterialModule,
    AntesInicioSesionService,
    SesionIniciadaService
  ],
  bootstrap: [AppComponent],
  entryComponents: [UpdateLibroComponent, MatConfirmDialogComponent, ]
})
export class AppModule { }
