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
      data =>{ this.handleResponse(data),
        sessionStorage.setItem("id", data['id']), 
        sessionStorage.setItem("tipo", data['tipo']), 
        sessionStorage.setItem("dni", data['dni']),
        sessionStorage.setItem("alias", data['alias']);
        console.log(data);
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

}
