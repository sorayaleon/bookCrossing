import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Global } from '../../Services/global.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public form = {
    dni: null,
    nombre: null,
    apellidos: null,
    alias: null,
    email: null,
    password: null,
    foto: null,
    passwordRep: null
  };
  public error: [];
  public url:string;
  public formularioRegistro: FormGroup;
  public usuario: Usuario;
  constructor(
    private http:HttpClient,
    private Token: TokenService,
    private router: Router,
    public fb: FormBuilder,
  ) { 
    this.url = Global.url;
    this.usuario = new Usuario(0,  '', '', '',  '', '', '', '',  '');
    // this.createForm();

    this.formularioRegistro = this.fb.group({
      dni: ['', [Validators.required]],
      nombre: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
      apellidos: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
      alias: ['',[Validators.required, Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.maxLength(30)]],
      password: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      // foto: ['', Validators.required],
      passwordRep:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    }, {validator: this.passwordMatchValidator});
  }

  ngOnInit() {
  }

  onSubmit(){
    return this.http.post(this.url +'registro', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/home');
    }

  handleError(error){
    this.error = error.error.errors;
  }

  passwordMatchValidator(formularioRegistro) {
    return formularioRegistro.get('password').value === formularioRegistro.get('passwordRep').value
       ? null : {'mismatch': true};
 }

//  createForm(){
//   this.formularioRegistro = this.fb.group({
//     foto: null,
    
//   })
// }

//  fileChangeEvent(event){
//   let reader = new FileReader();
//   if (event.target.files && event.target.files.length > 0) {
//     let file = event.target.files[0];
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       this.formularioRegistro.get('foto').setValue({
//         filename: file.name,
//         filetype: file.type,
//         value: reader.result.toString().split(",")[1]
//       });
//     };
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { Usuario } from '../../models/usuario';
// import { UsuarioService } from '../../services/usuario.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { Global } from '../../Services/global.service';


// @Component({
//   selector: 'app-registro',
//   templateUrl: './registro.component.html',
//   styleUrls: ['./registro.component.css'],
//   providers: [UsuarioService]
// })
// export class RegistroComponent implements OnInit {
//   public title: string;
//   public usuario: Usuario;
//   public status: string;
//   public saveUsuario;
//   public formularioRegistro: FormGroup;//Creo el objeto de tipo FormGroup

//   constructor(
//     //Propiedades del servicio
//     private _usuarioService: UsuarioService,
//     public fb: FormBuilder, //Objeto para la validación de los campos
//     private toastr: ToastrService,
//     private _router: Router
//   ) {
//     this.title = "Formulario de Registro";
//     this.usuario = new Usuario(0,  '', '', '',  '', '', '', '',  '', '');

//     //Reglas de validación
//     this.formularioRegistro = this.fb.group({
//       alias: ['',[Validators.required,Validators.maxLength(15)]],
//       email: ['',[Validators.required, Validators.email]],
//       password:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
//       passwordRep:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), ]],
//       // Validators: this.passwordMatchValidator
//     }, {validator: this.passwordMatchValidator});
//    }

//   ngOnInit() {
//   }
  
//   //METODO ONSUBMIT. Recibe el formulario
//   onSubmit(form){
//     console.log("submit");
//     console.log(this.formularioRegistro.value);
//     this._usuarioService.saveUsuario(this.usuario).subscribe(
//       // this._usuarioService.saveUsuario(this.usuario, this.formularioRegistro.value.foto).subscribe(
//       response => {
//         this.status='success';
//         this.saveUsuario = response.usuario;
//         this.showSuccess();
//         this._router.navigate(['/home']);
//       }, error => {
//         this.status = 'failed';
//         console.log(<any>error);
//         this.showError();
//       }
//     )
//   }
  
//   passwordMatchValidator(formularioRegistro) {
//     return formularioRegistro.get('password').value === formularioRegistro.get('passwordRep').value
//        ? null : {'mismatch': true};
//  }

//   showSuccess(){
//     this.toastr.success('El usuario ha sido insertado con éxito.', 'Correcto', {timeOut: 3000});
//   }

//   showError(){
//     this.toastr.error('El usuario no se ha insertado.', 'Error', {timeOut: 3000})
//   }

}
