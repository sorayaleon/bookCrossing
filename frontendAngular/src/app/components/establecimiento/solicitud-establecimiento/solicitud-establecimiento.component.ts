import { Component, OnInit } from '@angular/core';
import { Establecimiento } from '../../../models/establecimiento';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-solicitud-establecimiento',
  templateUrl: './solicitud-establecimiento.component.html',
  styleUrls: ['./solicitud-establecimiento.component.css'],
  providers: [EstablecimientoService, UsuarioService]
})
export class SolicitudEstablecimientoComponent implements OnInit {
  public idUsu;
  public email;
  public dni;
  public title: string;
  public establecimiento: Establecimiento;
  public status: string;
  public saveEstablecimiento;
  public formularioEstablecimiento: FormGroup;
  public usuario: Usuario;
  
  constructor(
    private _establecimientoService: EstablecimientoService,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    
  ) { 
    this.title = "Registra tu establecimiento";
    this.establecimiento = new Establecimiento(0, '', '', '', '', 0, 0, '', '', 0, 0, '')
   
    this.formularioEstablecimiento = this.fb.group({
      nombreEst: ['', [Validators.required, Validators.maxLength(30)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      cp: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern(/^\d+$/)]],
      tfno: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      horarioAp: ['', [Validators.required]],
      horarioC: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      this.idUsu = sessionStorage.getItem("id");
      this.email = sessionStorage.getItem("email");
      this.dni = sessionStorage.getItem("dni");
      console.log(this.idUsu);
      console.log(this.email);
      console.log(this.dni);
      this.getFichaUsuario(this.idUsu, this.email, this.dni);
    })
  }

  getFichaUsuario(id, email, dni){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form){
    console.log(this.formularioEstablecimiento.value);
    this.establecimiento.email = this.usuario.email;
    this.establecimiento.dni = this.usuario.dni;
    this._establecimientoService.saveEstablecimiento(this.establecimiento, this.establecimiento.email, this.establecimiento.dni).subscribe(
      response => {
        this.status='success';
        this.saveEstablecimiento = response.libro;
        this.showSuccess();
        this._router.navigate(['/home']);
      }, error => {
        // this.status = 'failed';
        this._router.navigate(['/home']);
        console.log(<any>error);
        this.showError();
      }
    )
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido creado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El establecimiento no se ha creado. Un mismo usuario no puede ser responsable de más de un establecimiento', 'Error', {timeOut: 3000})
  }
}
