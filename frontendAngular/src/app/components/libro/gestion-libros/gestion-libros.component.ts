import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../../Services/libro.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';


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

  constructor(
    private _libroService: LibroService,
    private _router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService,
    
  ) { 
    this.title = "Gestión de libros";
  }

  ngOnInit() {
    this._libroService.getLibros().subscribe(
      result => {
       this.libro = result;
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

  showSuccess(){
    this.toastr.success('El libro ha sido eliminado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El libro no se ha eliminado.', 'Error', {timeOut: 3000})
  }
}
