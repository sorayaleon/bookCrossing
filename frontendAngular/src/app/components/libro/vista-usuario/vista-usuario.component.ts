import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro';
import { LibroService } from '../../../Services/libro.service';
import { Global } from '../../../Services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../../../models/reserva';
import { PrestamoService } from '../../../Services/prestamo.service';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Establecimiento } from '../../../models/establecimiento';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css'],
  providers: [LibroService, EstablecimientoService]
})
export class VistaUsuarioComponent implements OnInit {
  public url: string;
  public libro: Libro;
  public imgUrl = '';
  public reserva: Reserva;
  public dniUsu;
  public fecha: any;
  public establecimiento: Establecimiento;
  public status: string;
  public idUsu;
  public saveReserva;

  constructor(
    private _libroService: LibroService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private http: HttpClient,
    private _establecimientoService: EstablecimientoService,
    private _prestamoService: PrestamoService,
  
  ) {
    this.url = Global.url;
    this.fecha = new Date('Y-m-d H:i:s');
    this.reserva = new Reserva(0, '', '', '', 0, '',
    '', '', '', '', 0);
   }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      this.idUsu = sessionStorage.getItem("id");
      this.dniUsu = sessionStorage.getItem("dni");
      let id = params.id;
      this.getFichaLibro(id);
      this.getFichaEstablecimiento(id);
    console.log(this.dniUsu);
    console.log(this.idUsu);
    })
  }

  getFichaLibro(id){
    this._libroService.getLibro(id).subscribe(
      response => {
        this.libro = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }
  
  getFichaEstablecimiento(id){
    this._establecimientoService.getEstablecimiento(id).subscribe(
      response => {
        this.establecimiento = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  solicitar(idL, idE, estado){
    this.getFichaLibro(idL);
    this.getFichaEstablecimiento(idE);
   
    this.reserva = new Reserva(0, 'prestamo', this.dniUsu, this.libro.titulo, this.libro.isbn, this.fecha,
    this.fecha, this.fecha, this.establecimiento.nombreEst, '', 0);
    console.log(this.libro.estado);
    console.log(this.libro);
    console.log(this.establecimiento);
    console.log(this.reserva);
    estado = 'inactivo';

    this._libroService.updateEstadoLibro(idL, estado).subscribe(
      response => {
        console.log(estado);
        this.showSuccess();
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )
    this._prestamoService.solicitaPrestamo(this.reserva).subscribe(
      response => {
        console.log(response);
        this.status = 'success';
        this.saveReserva = response.reserva;
        this.showSuccess();
        this._router.navigate(['/home']);
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )
    
  }

  showSuccess(){
    this.toastr.success('El libro ha sido reservado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El libro no se ha reservado.', 'Error', {timeOut: 3000})
  }

  // formatDate(date:Date): string{
  //   const dia = date.getDate();
  //   const mes = date.getMonth()+1;
  //   const anio = date.getFullYear();

  //   return `${dia}-${mes}-${anio}`;
  // }
}
