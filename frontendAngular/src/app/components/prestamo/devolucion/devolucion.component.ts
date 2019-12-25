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

  constructor(
    private _prestamoService: PrestamoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private _libroService: LibroService, 
    private _historialService: HistorialService,
    public fb: FormBuilder,
  ) {
    this.url = Global.url;
    this.fechaDevolucion = new Date('Y-m-d H:i:s');

    this.formularioDevolucion = this.fb.group({
      incidencia: ['', [Validators.required]]
    })
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

showSuccess(){
  this.toastr.success('La devolución del préstamo se ha realizado correctamente.', 'Correcto', {timeOut: 3000});
}

showError(){
  this.toastr.error('No se ha podido realizar la devolución del préstamo.', 'Error', {timeOut: 3000})
}

}
