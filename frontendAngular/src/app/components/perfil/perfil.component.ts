import { Component, OnInit } from '@angular/core';
import { Global } from '../../Services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../Services/usuario.service';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      this.idUsu = sessionStorage.getItem("id");
      console.log(this.idUsu);
      this.getFichaUsuario(this.idUsu);
       
    })
  }

  getFichaUsuario(id){
    this._usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response;
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
