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
import { HistorialService } from '../../../Services/historial.service';
import { ComentariosService } from '../../../Services/comentarios.service';
import { Comentarios } from '../../../models/comentarios';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import * as moment from 'moment';
import { UsuarioService } from '../../../Services/usuario.service';
import { Valoracion } from '../../../models/valoracion';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css'],
  providers: [LibroService, EstablecimientoService, ComentariosService, HistorialService]
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
  public idusu;
  public comentarios: Comentarios;
  public comentario: any;
  public comentarioLibro = 0;
  public alias;
  public formularioComentarios: FormGroup;
  public formularioEstrellas: FormGroup;
  pageActual: number = 1;
  filterLibro = '';
  public usuario: Usuario;
  public tipo;
  public solicitud;
  public numPrestamos = 0;
  public fechaHoy: any;
  public numLibros;
  public estado;
  public valoracion: Valoracion;
  public valoracionLibro;
  public numValoracion = 0;
  public puntuacionTotal;
  public votos;
  public estrellas;
  public puntos;

  getRadioButtonSelectedValue(event: any)
  {
      this.puntos = event.target.value;
  }

  constructor(
    private _libroService: LibroService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private http: HttpClient,
    private _establecimientoService: EstablecimientoService,
    private _prestamoService: PrestamoService,
    private _historialService: HistorialService,
    private _comentariosService: ComentariosService,
    private _usuarioService: UsuarioService,
    public fb: FormBuilder,
    

  ) {
    this.url = Global.url;
    this.fecha = new Date('Y-m-d H:i:s');
    this.reserva = new Reserva(0, '', '', '', 0, 0, 0, '',
     '', '', 0, '', '');
    this.valoracion = new Valoracion(0, 0, 0, 0);
    console.log(this.fecha);
    this.formularioComentarios = this.fb.group({
      comentario: [''],
      rating: ['']
    })

    this.fechaHoy = new Date();
    this.fechaHoy = moment(this.fechaHoy).format('YYYY-MM-DD');

    
   }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      this.idUsu = sessionStorage.getItem("id");
      this.dniUsu = sessionStorage.getItem("dni");
      this.alias = sessionStorage.getItem("alias");
      this.tipo = sessionStorage.getItem("tipo");
      this.estado = sessionStorage.getItem("estado");
      this.numLibros = sessionStorage.getItem("numLibros");
      let id = params.id;
      console.log(id)
      this.getFichaLibro(id);
      this.mostrarComentarios(id);
      this.controlPrestamo();
      this.obtenerValoracionLibro(id);
      
      
    })
  }

  onSubmit(form){
    this.crearComentario(this.formularioComentarios.value.comentario);
    this.valorarLibro(this.libro.id);
    console.log(this.libro.id);
  }

  getFichaLibro(id){
    this._libroService.getLibro(id).subscribe(
      response => {
        this.libro = response;
        console.log(this.libro);
        console.log(this.libro.titulo);
        console.log(this.libro.establecimiento);
        // this.getFichaEstablecimiento(this.libro.establecimientoInicial);
      }, error => {
        console.log(<any>error);
      }
    );
  }


  solicitar(id, estado){
    console.log(id);
    this.getFichaLibro(id);
    // this.getFichaEstablecimiento(idE);
    console.log(this.fecha);
    this.reserva = new Reserva(0, 'solicitud', this.dniUsu, this.libro.titulo, this.libro.codigo, this.libro.id, this.idUsu,  this.fecha,
    this.libro.establecimiento, '', 0, '', 'no');
    console.log(this.libro.estado);
    console.log(this.libro);
    console.log(this.establecimiento);
    console.log(this.reserva);
    estado = 'solicitado';

    this._libroService.updateEstadoLibro(id, estado).subscribe(
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
        this.sumaLibro(this.idUsu);
        this.showSuccess();
        this._router.navigate(['/home']);
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )

    this._historialService.registraHistorial(this.reserva).subscribe(
      response => {
        console.log(response);
        this.status = 'success';
        this.saveReserva = response.reserva;
        this.showSuccess();
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )
    
  }

  obtenerValoracionLibro(id){
    
    this._libroService.getValoracion().subscribe(
      response => {
        this.valoracionLibro = response;
        console.log(<any>response);
        for (let index = 0; index < this.valoracionLibro.length; index++) {
          if(this.valoracionLibro[index]["idLibro"]==id){
             this.numValoracion += 1;
             this.puntuacionTotal = this.valoracionLibro[index]["puntuacion"];
             this.votos = this.valoracionLibro[index]["votos"];
          }
        }
        this.estrellas = this.calcularEstrellas(this.puntuacionTotal, this.votos);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  mostrarComentarios(id){
    this._comentariosService.getComentarios().subscribe(
      response => {
        console.log(response);
        this.comentario = response;
        for (let index = 0; index < this.comentario.length; index++) {
          if(this.comentario[index]["idL"]==id){
             this.comentarioLibro += 1;
          }
        }

      }, error => {
        console.log(<any>error);
      }
    )
  }

 
 
  crearComentario(comentario){
  
    this.comentarios = new Comentarios(0, this.idUsu, this.alias, comentario, this.libro.id, 'activo');
    this._comentariosService.saveComentario(this.comentarios).subscribe(
      response => {
        this.comentarios =response;
        console.log(response);
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/vistaLibro/'+this.libro.id])); 
      }, error => {
        console.log(<any>error);
      }
    )
  }

  eliminarComentario(id){
    this._comentariosService.updateEstadoComentario(id, 'inactivo').subscribe(
      response => {
        console.log(response);
        this.inactivarSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/vistaLibro/'+this.libro.id])); 
      }, error => {
        console.log(<any>error);
        this.inactivarError();
      }
    );
  }

  controlPrestamo(){
    this._usuarioService.getUsuario(this.idUsu).subscribe(
      response => {
        console.log(<any>response);
        this.usuario = response;
        console.log(this.usuario.estado);
      }, error => {
        console.log(<any>error);
      }
    )
  }

  sumaLibro(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        console.log(<any>response);
        this.usuario = response;
        this.numLibros = this.usuario.numLibros;
        console.log(this.numLibros);

        this.numLibros+=1;
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
  
  valorarLibro(idL){
    console.log(this.puntos)
    this._libroService.getValoracion().subscribe(
      response => {
        console.log(<any>response);
        this.valoracionLibro = response;
        this.votos+=1;
        this.puntuacionTotal+= parseInt(this.puntos);
        console.log(this.puntuacionTotal)
        console.log(this.votos)
        for (let index = 0; index < this.valoracionLibro.length; index++) {
          if(this.valoracionLibro[index]["idL"]==idL){
             this.numValoracion += 1;
          }
        }
        console.log(this.numValoracion)
        if(this.numValoracion > 0){
            this._libroService.updateValorarLibro(idL, this.puntuacionTotal, this.votos).subscribe(
              response => {
                console.log(<any>response);
              }, error => {
                console.log(<any>error);
              }
            )
        }else{
          this.valoracion = new Valoracion(0 ,idL, this.puntos, 1);
          this._libroService.valorarLibro(this.valoracion).subscribe(
            response => {
              console.log(<any>response);
            }, error => {
              console.log(<any>error);
            }
          )
        }
      }, error => {
        console.log(<any>error);
      }
    )
  }


  calcularEstrellas(puntuacionTotal, votos){
    let resultado;
    let max = votos * 5;
    let porcentaje = puntuacionTotal*100/max;
    if(porcentaje<=20){
      resultado = 1;
    }else if(porcentaje<=40){
      resultado = 2;
    }else if(porcentaje<=60){
      resultado = 3;
    }else if(porcentaje<=80){
      resultado = 4;
    }else if(porcentaje<=100){
      resultado = 5;
    }
    return resultado;
  }

  

  showSuccess(){
    this.toastr.success('El libro ha sido reservado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El libro no se ha reservado.', 'Error', {timeOut: 3000})
  }

   inactivarSuccess(){
     this.toastr.success('El comentario ha sido bloqueado con éxito.', 'Correcto', {timeOut: 3000});
   }

   inactivarError(){
    this.toastr.error('No se ha podido bloquear el comentario.', 'Correcto', {timeOut: 3000});
  }
}
