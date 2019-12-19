import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../../Services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  private baseUrl: string;

  public form = {
    email: null
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { 
    this.baseUrl = Global.url;
  }

  ngOnInit() {
  }

  onSubmit(){
    this.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.showError(error)
    );
  }

  sendPasswordResetLink(data){
    return this.http.post(`${this.baseUrl}sendPasswordResetLink`, data)
  }

  handleResponse(res){
    console.log(res);
    this.showSuccess();
    this.form.email = null
  }


  showSuccess(){
    this.toastr.success('Le hemos mandado un email, por favor revise su bandeja de entrada.', 'Correcto', {timeOut: 3000});
  }

  showError(error){
    this.toastr.error(error, 'Error', {timeOut: 3000})
  }
}
