import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Establecimiento } from '../../../models/establecimiento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';

@Component({
  selector: 'app-update-establecimiento',
  templateUrl: './update-establecimiento.component.html',
  styleUrls: ['./update-establecimiento.component.css'],
  providers: [EstablecimientoService]
})
export class UpdateEstablecimientoComponent implements OnInit {
  public title: string;
  public establecimiento: Establecimiento;
  public selectedEstablecimiento: Establecimiento;
  public status: string;
  public updateEstablecimiento;
  public formularioEstablecimiento: FormGroup;

  constructor(
    private _establecimientoService : EstablecimientoService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService

  ) { 
    this.title = "Actualizar datos";
    this.establecimiento = new Establecimiento(0, '', '', '', '', 0, 0, '', '', 0, 0, '')
   
    this.formularioEstablecimiento = this.fb.group({
     
      tfno: ['', [Validators.required, Validators.pattern(/^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/)]],
      horarioAp: ['', [Validators.required]],
      horarioC: ['', [Validators.required]],
    
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      let id = params.id;

      this.getFichaEstablecimiento(id);
    })
  }
  
  getFichaEstablecimiento(id){
    this._establecimientoService.getEstablecimiento(id).subscribe(
      response => {   
        console.log("Entro en response");
        console.log(response);
        this.establecimiento = response;
        
      }, error => {
        
        console.log(<any>error);
      }
    );
  }

  onSubmit(){
    console.log(this.formularioEstablecimiento.value);
    this.dialogService.openConfirmDialog('¿Deseas actualizar el libro?').afterClosed().subscribe(res =>{
      if(res){
        this._establecimientoService.updateEstablecimiento(this.establecimiento.id, this.formularioEstablecimiento.value).subscribe(
          response=>{
            console.log(response);
            this.showSuccess();
            this.router.navigate(['/gestionEstablecimientos']);
          },
    
         error => {
           console.log("estoy en error");
           this.showError();
           //this.status = 'failed';
           console.log(<any>error);
         });
      }
    });

    
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido actualizado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El establecimiento no se ha actualizado.', 'Error', {timeOut: 3000})
  }
}
