import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../Services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public error = [];
  public form = {
    email:null,
    password:null,
    confirmPassword:null,
    resetToken:null
  }
  public url:string;

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { 
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
    this.url = Global.url;
  }

  ngOnInit() {
  }

  onSubmit(){
    return this.http.post(this.url+'resetPassword', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data){
    this.showSuccess();
    this.router.navigateByUrl('/login');
  }

  handleError(error){
    console.log(this.http.post(this.url+'resetPassword', this.form));
    this.error = error.error.errors;
    this.showError();
  }

  showSuccess(){
    this.toastr.success('La contraseña se ha cambiado correctamente.', 'Correcto', {timeOut: 3000});
  }
  
  showError(){
    this.toastr.error('No se ha podido cambiar la contraseña.', 'Error', {timeOut: 3000})
  }
}
