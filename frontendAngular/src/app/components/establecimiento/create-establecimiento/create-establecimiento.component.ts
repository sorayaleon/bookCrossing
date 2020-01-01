import { Component, OnInit } from '@angular/core';
import { Establecimiento } from '../../../models/establecimiento';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-create-establecimiento',
  templateUrl: './create-establecimiento.component.html',
  styleUrls: ['./create-establecimiento.component.css'],
  providers: [EstablecimientoService, UsuarioService]
})
export class CreateEstablecimientoComponent implements OnInit {
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
      dni: ['', [Validators.required]],
      email:['',[Validators.required, Validators.email]],
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
      // this.getFichaUsuario(this.idUsu, this.email, this.dni);
      this._usuarioService.getUsuarios().subscribe(
        response => {
          this.usuario = response;
        }, error => {
          console.log(<any>error);
        }
      )
    
    })
   
  }

  // getFichaUsuario(id, email, dni){
  //   this._usuarioService.getUsuario(id).subscribe(
  //     response => {
  //       this.usuario = response;
  //     }, error => {
  //       console.log(<any>error);
  //     }
  //   );
  // }

  onSubmit(form){
    console.log(this.formularioEstablecimiento.value);

    this._establecimientoService.saveEstablecimientoAdmin(this.establecimiento).subscribe(
      response => {
        this.status='success';
        this.showSuccess();
        this._router.navigate(['/gestionSolicitudes']);
      }, error => {
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/gestionEstablecimientos']));
        console.log(<any>error);
        this.showError();
      }
    )
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido creado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('No se ha podido crear el establecimiento.', 'Error', {timeOut: 3000})
  }
}
