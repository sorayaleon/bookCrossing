import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../../Services/libro.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-gestion-libros',
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css'],
  providers: [LibroService]
})
export class GestionLibrosComponent implements OnInit {
  public title: string;
  public libro: any;
  pageActual: number = 1;
  filterLibro = '';
  public items = 0;
  public tipoUsu;

  constructor(
    private _libroService: LibroService,
    private _router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private auth: AuthService,
    private Token: TokenService,
    
  ) { 
    this.title = "Gestión de libros";
  }

  ngOnInit() {
    this.tipoUsu = sessionStorage.getItem("tipo");

    this._libroService.getLibros().subscribe(
      result => {
       this.libro = result;
       for(let index = 0; index<this.libro.length; index++){
          this.items +=1;
       }
       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );
  
  }

  //Borrar libro
  deleteLibro(id){
    this.dialogService.openConfirmDialog('¿Deseas borrar el libro?').afterClosed().subscribe(res =>{
      if(res){
    this._libroService.deleteLibro(id).subscribe(
      response => {
        this.showSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/gestionLibros'])); 
      }, error => {
        console.log(<any>error);
        this.showError();
      }
    )
  }
});
  }

redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }
  
  showSuccess(){
    this.toastr.success('El libro ha sido eliminado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El libro no se ha eliminado.', 'Error', {timeOut: 3000})
  }
}
