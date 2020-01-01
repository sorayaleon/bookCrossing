import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Global } from '../../Services/global.service';
import { ToastrService } from 'ngx-toastr';
import { validDNI } from 'spain-id';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
 public dni;
   
  public form = {
    dni: null,
    nombre: null,
    apellidos: null,
    alias: null,
    email: null,
    password: null,
    passwordRep: null,
    numLibros: 0
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
    private toastr: ToastrService,
    
  ) { 
    this.url = Global.url;
    this.usuario = new Usuario(0,  '', '', '',  '', '', '', '',  '', 0);
    // this.createForm();
    

    this.formularioRegistro = this.fb.group({
      dni: ['', [Validators.required]],
      nombre: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
      apellidos: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
      alias: ['',[Validators.required, Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      passwordRep:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    }, {validator: this.passwordMatchValidator, 
      // validators: this.validarDni
    });
  }

  ngOnInit() {
  }

  onSubmit(){

    this.sendEmailValidationLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

    return this.http.post(this.url +'registro', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
   
  }

  sendEmailValidationLink(data){
    return this.http.post(`${this.url}sendValidationMailLink`, data);
  }

  handleResponse(data){
    // this.Token.handle(data.access_token);
    this.showSuccess();
    this.router.navigateByUrl('/login');
    }

  handleError(error){
    this.error = error.error.errors;
    this.showError();
  }

  passwordMatchValidator(formularioRegistro) {
    return formularioRegistro.get('password').value === formularioRegistro.get('passwordRep').value
       ? null : {'mismatch': true};
 }

 showSuccess(){
  this.toastr.success('El usuario se ha creado con éxito. Le hemos enviado un email, por favor revise su bandeja de entrada', 'Correcto', {timeOut: 3000});
}

showError(){
  this.toastr.error('No se ha podido crear el usuario.', 'Error', {timeOut: 3000})
}

// validarDni(formularioRegistro){
//   this.dni = formularioRegistro.get('dni').value;
//   return validDNI(this.dni);
// }
}
