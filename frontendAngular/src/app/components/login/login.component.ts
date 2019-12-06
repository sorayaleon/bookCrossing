import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Services/token.service';
import { Global } from '../../Services/global.service';

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
    private Token: TokenService
  ) {
    this.url = Global.url;
   }

  ngOnInit() {
  }

  onSubmit(){
    return this.http.post(this.url+'login', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

handleResponse(data){
this.Token.handle(data.access_token);
}

  handleError(error){
    this.error = error.error.error;
  }
}
