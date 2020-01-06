import { Component, OnInit } from '@angular/core';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Establecimiento } from '../../../models/establecimiento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';

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
  public tipoUsu;
  public idUsu;

  constructor(
    private _establecimientoService : EstablecimientoService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private auth: AuthService,
    private Token: TokenService,

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
    this.tipoUsu = sessionStorage.getItem("tipo");
    this.idUsu = sessionStorage.getItem("id");
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
    this.dialogService.openConfirmDialog('¿Deseas actualizar los datos del establecimiento?').afterClosed().subscribe(res =>{
      if(res){
        this._establecimientoService.updateEstablecimiento(this.establecimiento.id, this.formularioEstablecimiento.value).subscribe(
          response=>{
            console.log(response);
            this.showSuccess();
            if(this.tipoUsu == 'admin'){
              this.router.navigate(['/gestionEstablecimientos']);
            } else if(this.tipoUsu == 'responsable'){
              this.router.navigate(['/fichaEstablecimiento/'+this.establecimiento.id]);
            }
            
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

  redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  showSuccess(){
    this.toastr.success('El establecimiento ha sido actualizado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El establecimiento no se ha actualizado.', 'Error', {timeOut: 3000})
  }
}
