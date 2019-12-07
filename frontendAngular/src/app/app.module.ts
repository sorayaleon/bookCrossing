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
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SesionIniciadaService } from './Services/sesion-iniciada.service';
import { AntesInicioSesionService } from './Services/antes-inicio-sesion.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    RequestResetComponent,
    ResponseResetComponent,
    HomeComponent,
    MatConfirmDialogComponent,
   
    
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
    

  ],
  providers: [
    MatDialog,
    MaterialModule,
    AntesInicioSesionService,
    SesionIniciadaService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent, ]
})
export class AppModule { }
