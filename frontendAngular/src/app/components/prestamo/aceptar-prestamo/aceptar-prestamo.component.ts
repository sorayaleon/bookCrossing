import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../Services/prestamo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { LibroService } from '../../../Services/libro.service';
import { Libro } from '../../../models/libro';


@Component({
  selector: 'app-aceptar-prestamo',
  templateUrl: './aceptar-prestamo.component.html',
  styleUrls: ['./aceptar-prestamo.component.css'],
  providers: [PrestamoService]
})
export class AceptarPrestamoComponent implements OnInit {
  public solicitud: any;
  public numInac = 0;
  pageActual: number = 1;
  filterSolicitud = '';
  public saveReserva;
  public libro: Libro;
  
  constructor(
    private _prestamoService: PrestamoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private _libroService: LibroService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      let id = params.id;
      this.getFichaLibro(id);
    })

    this._prestamoService.getSolicitudes().subscribe(
      result => {
       this.solicitud = result;
       console.log(this.solicitud);
       for (let index = 0; index < this.solicitud.length; index++) {
         if(this.solicitud[index]["tipo"]=="solicitud"){
            this.numInac += 1;
         }
       }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );
  }

  getFichaLibro(id){
    this._libroService.getLibro(id).subscribe(
      response => {
        this.libro = response;
        console.log(this.libro);
      }, error => {
        console.log(<any>error);
      }
    );
  }

  confirmSolicitud(id, estado, tipo){
    console.log(estado);
    // this.getFichaLibro(idL);
    estado = "prestado";
    tipo = "prestamo"
    this.dialogService.openConfirmDialog('¿Deseas confirmar el préstamo?').afterClosed().subscribe(res =>{
      if(res){
        this._libroService.updateEstadoLibro(id, estado).subscribe(
          response=>{
            console.log(estado);
            this.showSuccess();
            // this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
            //   this._router.navigate(['/gestionPrestamos'])); 
            console.log(estado);
          },
    
         error => {
           console.log("estoy en error");
          //  console.log(this.solicitud.estado);
           this.showError();
           //this.status = 'failed';
           console.log(<any>error);
         });

        //  this._prestamoService.updateTipoReserva(id, tipo).subscribe(
        //   response => {
        //     console.log(response);
        //     this.saveReserva = response.reserva;
        //   }, error => {
        //     console.log(<any>error);
        //   }
        // )
      }
    });
  }

  showSuccess(){
    this.toastr.success('El préstamo se ha realizado correctamente.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido realizar el préstamo.', 'Error', {timeOut: 3000})
  }
}
