import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, Params } from '@angular/router';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Establecimiento } from '../../../models/establecimiento';
import { Global } from '../../../Services/global.service';

@Component({
  selector: 'app-create-establecimiento',
  templateUrl: './create-establecimiento.component.html',
  styleUrls: ['./create-establecimiento.component.css'],
  providers: [EstablecimientoService]
})
export class CreateEstablecimientoComponent implements OnInit {

  public title: string;
  public establecimiento: Establecimiento;
  public status: string;
  public saveEstablecimiento;
  public formularioEstablecimiento: FormGroup;

  constructor(
    private _establecimientoService: EstablecimientoService,
    public fb: FormBuilder, 
    private toastr: ToastrService,
    private _router: Router
  ) { 
    this.title = "Resgistrar Establecimiento";
    this.establecimiento = new Establecimiento (0,'','','','', 0 , 0,'', '', 0, 0, '');
   
    this.formularioEstablecimiento = this.fb.group({
          nombreResp: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
          nombreEst: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
          direccion: ['',[Validators.required, Validators.maxLength(20)]],
          cp:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
          email:['',[Validators.required, Validators.maxLength(30)]],
          tfno:['',[Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
          horarioAp:['',[Validators.required]],
          horarioC:['',[Validators.required]],
          latitud:['',[Validators.required]],
          longitud:['',[Validators.required]],
        }, );
    
  }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(this.formularioEstablecimiento.value);
    this._establecimientoService.saveEstablecimiento(this.establecimiento).subscribe(
      response => {
        this.status='success';
        this.saveEstablecimiento = response.establecimiento;
        this.showSuccess();
        this._router.navigate(['/home']);
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido creado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El establecimiento no se ha creado.', 'Error', {timeOut: 3000})
  }

}

