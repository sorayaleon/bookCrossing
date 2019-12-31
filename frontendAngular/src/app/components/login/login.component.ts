import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Services/token.service';
import { Global } from '../../Services/global.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }

  public error = null;
  public url:string;
  public estado;
 
  constructor(
    private http: HttpClient,
    private Token: TokenService,
    private router: Router,
    private auth: AuthService,
  
  ) {
    this.url = Global.url;
   }

  ngOnInit() {
  }

  onSubmit(){
    
    return this.http.post(this.url+'login', this.form).subscribe(
      data =>{ 
        sessionStorage.setItem("id", data['id']), 
        sessionStorage.setItem("tipo", data['tipo']), 
        sessionStorage.setItem("dni", data['dni']),
        sessionStorage.setItem("alias", data['alias']);
        sessionStorage.setItem("email", data['email']);
        sessionStorage.setItem("estado", data['estado']);
        this.estado = sessionStorage.getItem("estado");
        console.log(this.estado)
        if(this.estado != 'inactivo'){
          this.handleResponse(data);
        }else{
          this.pedirConfirmacion();
        }
        
      },
      error => this.handleError(error)
    );
  }

handleResponse(data){
  this.Token.handle(data.access_token);
  this.auth.changeAuthStatus(true);
  this.router.navigate(['/home']).then(()=>{window.location.reload()} );
}

  handleError(error){
    this.error = error.error.error;
  }


  pedirConfirmacion(){
    this.error = "No has confirmado tu cuenta. Por favor, revisa tu email y haz click en el botón 'Validar Email'";
  }
}
