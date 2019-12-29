import { Component, OnInit } from '@angular/core';
import { Global } from '../../Services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../Services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { PrestamoService } from '../../Services/prestamo.service';
import { HistorialService } from '../../Services/historial.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  public url: string;
  public usuario: Usuario;
  public idUsu;
  public historiales: any;
  public numHistoriales = 0;
  pageActual: number = 1;
  filterHisotrial = '';
  public fechaHoy: any;
  public prestamos: any;
  public numPrestamos;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _prestamoService: PrestamoService,
    private _historialService: HistorialService,
  ) { 
    this.url = Global.url;
    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');

  }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      this.idUsu = sessionStorage.getItem("id");
      console.log(this.idUsu);
      this.getFichaUsuario(this.idUsu);
      this.prestamo();
      this.historial();
    })
  }

  getFichaUsuario(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response;
        this.numPrestamos = this.usuario.numLibros;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  eliminarUsuario(id){
    this._usuarioService.deleteUsuario(id).subscribe(
      response => {
        this.showSuccess();
        this._router.navigate(['/home']);
      }, error => {
        console.log(<any>error);
        this.showError();
      }
    )
  }

  prestamo(){
    this._prestamoService.getSolicitudes().subscribe(
      response => {
        this.prestamos = response;
        console.log(<any>response);
        for (let index = 0; index < this.prestamos.length; index++) {
          if(this.prestamos[index]["tipo"]=="prestamo" && this.prestamos[index]["idUsu"]==this.idUsu && this.prestamos[index]["fecha"] < this.fechaHoy){
             this.numPrestamos += 1;
          }
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }

  historial(){
    this._historialService.getHistorial().subscribe(
      response => {
        this.historiales = response;
        for (let index = 0; index < this.historiales.length; index++) {
          if(this.historiales[index]["idUsu"]== this.idUsu){
             this.numHistoriales += 1;
          }
        }
        console.log(<any>response);
        console.log(this.numHistoriales)
      }, error => {
        console.log(<any>error);
      }
    )
  }

  volver(id){
    this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
      this._router.navigate(['/perfil/'+id]));
  }

  showSuccess(){
    this.toastr.success('Usuario dado de baja de la aplicación.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('Error al dar de baja al usuario de la aplicación.', 'Error', {timeOut: 3000})
  }
}
