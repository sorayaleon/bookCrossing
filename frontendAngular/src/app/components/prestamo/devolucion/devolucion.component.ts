import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../models/reserva';
import { Global } from '../../../Services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { PrestamoService } from '../../../Services/prestamo.service';
import { HistorialService } from '../../../Services/historial.service';
import { Libro } from '../../../models/libro';
import { LibroService } from '../../../Services/libro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../Services/usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css'],
  providers: [PrestamoService, LibroService, HistorialService]
})
export class DevolucionComponent implements OnInit {
  public url: string;
  public prestamo: Reserva;
  public savePrestamo;
  public fechaDevolucion: any;
  public status: string;
  public formularioDevolucion: FormGroup;
  public idPrestamo;
  public prestamos;
  public fechaHoy: any;
  public numPrestamos = 0;
  public numLibros;
  public usuario;

  constructor(
    private _prestamoService: PrestamoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private _libroService: LibroService, 
    private _historialService: HistorialService,
    private _usuarioService: UsuarioService,
    public fb: FormBuilder,
  ) {
    this.url = Global.url;
    this.fechaDevolucion = new Date('Y-m-d H:i:s');

    this.formularioDevolucion = this.fb.group({
      incidencia: ['', [Validators.required, Validators.maxLength(500)]]
    })

    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');
   }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      let id = params.id;
      this.getSolicitud(id);
     console.log(id);
     this.idPrestamo = id;
    })
  }

  getSolicitud(id){
    this._prestamoService.getSolicitud(id).subscribe(
      response => {
        this.prestamo = response;
        console.log(this.prestamo.fecha);
        // this.calcularFecha(this.prestamo.fecha);
      }, error => {
        console.log(<any>error);
        
      }
    );
  }
  onSubmit(form){
    console.log(this.formularioDevolucion.value.incidencia);
    this.devolverPrestamo(this.formularioDevolucion.value.incidencia);
    
  
  }

  devolverPrestamo(incidencia){
    let tipo = "devolucion";
   

    this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
      if(res){
        this.prestamo = new Reserva(0, tipo, this.prestamo.dni, this.prestamo.titulo, this.prestamo.codigo, this.prestamo.idL, this.prestamo.idUsu, this.fechaDevolucion,
          this.prestamo.nombreEst, '', 0, incidencia, 'si');

      this._historialService.registraHistorial(this.prestamo).subscribe(
        response => {
          console.log(response);
          this.status = 'success';
          this.savePrestamo = response.reserva;
          this.showSuccess();
        }, error => {
          this.status = 'failed';
          console.log(<any>error);
          this.showError();
        }
      )
      this.restaLibro(this.prestamo.idUsu);
      this._prestamoService.deleteReserva(this.idPrestamo).subscribe(
        response => {
          console.log(response);
          this._libroService.updateEstadoLibro(this.prestamo.idL, "activo").subscribe(
            response => {
              this.showSuccess();
            }, error => {
              this.status = 'failed';
              console.log(<any>error);
              this.showError();
            }
          )
          console.log(this.prestamo.idUsu);
          this.controlPenalizados(this.prestamo.idUsu);
          this.showSuccess();
          this._router.navigate(['/devolucionPrestamo']);
        }, error => {
          this.status = 'failed';
          console.log(<any>error);
          this.showError();
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
