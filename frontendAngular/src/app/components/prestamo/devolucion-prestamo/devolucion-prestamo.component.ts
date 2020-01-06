import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../Services/prestamo.service';
import { Reserva } from '../../../models/reserva';
import { DialogService } from '../../../shared/dialog.service';
import { HistorialService } from '../../../Services/historial.service';
import { LibroService } from '../../../Services/libro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';
import * as moment from 'moment';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Establecimiento } from 'src/app/models/establecimiento';

@Component({
  selector: 'app-devolucion-prestamo',
  templateUrl: './devolucion-prestamo.component.html',
  styleUrls: ['./devolucion-prestamo.component.css']
})
export class DevolucionPrestamoComponent implements OnInit {
  public solicitud: any;
  public numPrestamos = 0;
  pageActual: number = 1;
  filterSolicitud = '';
  public prestamo: Reserva;
  public savePrestamo;
  public fechaDevolucion: any;
  public status: string;
  public prestamos;
  public fechaHoy: any;
  public usuario;
  public numLibros;
  public filtro: any = {dni : ''};
  public tipoUsu;
  public establecimientos;
  public establecimento: Establecimiento;
  public dni;

  constructor(
    private _prestamoService: PrestamoService,
    private dialogService: DialogService,
    private _historialService: HistorialService,
    private _libroService: LibroService,
    private toastr: ToastrService,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private auth: AuthService,
    private Token: TokenService,
    private _establecimientoService: EstablecimientoService,

  ) { 

    this.dni = sessionStorage.getItem("dni");
    this.fechaDevolucion = new Date('Y-m-d H:i:s');

    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.tipoUsu = sessionStorage.getItem("tipo");

    this._prestamoService.getSolicitudes().subscribe(
      result => {
       this.solicitud = result;
       console.log(this.solicitud);
       for (let index = 0; index < this.solicitud.length; index++) {
         if(this.solicitud[index]["tipo"]=="prestamo"){
            this.numPrestamos += 1;
         }
       }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );

  this.getEstablecimientos();
  }

getEstablecimientos()
{
  this._establecimientoService.getEstablecimientos().subscribe(
    response => {
      this.establecimientos = response;
      for(let index = 0; index<this.establecimientos.length; index++){
        if(this.dni == this.establecimientos[index]["dni"]){
          this.establecimento = this.establecimientos[index];
        }
      }
    }, error => {
      console.log(<any>error)
    }
  )
}  


  redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }

  devolverPrestamo(id, dni, idL, idUsu, titulo, codigo, nombreEst){
      let tipo = "devolucion";
  
      this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
        if(res){
          this.prestamo = new Reserva(0, 'devolucion', dni, titulo, codigo, idL, idUsu, this.fechaDevolucion,
            nombreEst, '', 0, '', 'no');
  
        this._historialService.registraHistorial(this.prestamo).subscribe(
          response => {
            console.log(response);
            this.status = 'success';
            this.savePrestamo = response.reserva;
            // this.showSuccess();
          }, error => {
            this.status = 'failed';
            console.log(<any>error);
            this.showError();
          }
        )
        
        this.restaLibro(idUsu);

        this._prestamoService.deleteReserva(id).subscribe(
          response => {
            console.log(response);
            this._libroService.updateEstadoLibro(idL, "activo").subscribe(
              response => {
                // this.showSuccess();
              }, error => {
                this.status = 'failed';
                console.log(<any>error);
                this.showError();
              }
            )
            this.controlPenalizados(idUsu);
            this.showSuccess();
            this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/devolucionPrestamo'])); 

          }, error => {
            this.status = 'failed';
            console.log(<any>error);
            this.showError();
          }
        )

        this._libroService.updateEstablecimientoLibro(this.prestamo.idL, this.establecimento.nombreEst).subscribe(
          response => {
            console.log(response)
          }, error => {
            console.log(<any>error)
          }
          )
    }
  })
  }
  
  controlPenalizados(idUsu){
    this.numPrestamos = 0;
    console.log(idUsu);
    this._prestamoService.getSolicitudes().subscribe(
      response => {
        console.log(<any>response);
        this.prestamos = response;
        for (let index = 0; index < this.prestamos.length; index++) {
          if(this.prestamos[index]["tipo"]=="prestamo" && this.prestamos[index]["fecha"]<this.fechaHoy && this.prestamos[index]["idUsu"]==idUsu){
             this.numPrestamos += 1;
             console.log("ha entrado en contador")
             console.log(this.numPrestamos);
             console.log(" numero prestados")
          }
        }
        if(this.numPrestamos == 0){
          this.cambiarEstadoUsuario(idUsu);
          console.log("ha entrado en cambiar usuario")
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }
  
  cambiarEstadoUsuario(idUsu){
    this._usuarioService.updateEstadoUsuario(idUsu, 'activo').subscribe(
      response => {
        console.log(<any>response);
        console.log("ha entrado en la funcion cambiar usuario")
      }, error => {
        console.log(<any>error);
      }
    )
  }

  restaLibro(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        console.log(<any>response);
        this.usuario = response;
        this.numLibros = this.usuario.numLibros;

        this.numLibros-=1;
    this._usuarioService.UpdateNumLibros(id, this.numLibros).subscribe(
      response =>{
        console.log(<any>response);
      }, error => {
        console.log(<any>error);
      }
    )
      }, error => {
        console.log(<any>error);
      }
    )
    
  }
  
  showSuccess(){
    this.toastr.success('La devolución del préstamo se ha realizado correctamente.', 'Correcto', {timeOut: 3000});
  }
  
  showError(){
    this.toastr.error('No se ha podido realizar la devolución del préstamo.', 'Error', {timeOut: 3000})
  }
  
}
