import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro';
import { LibroService } from '../../../Services/libro.service';
import { Global } from '../../../Services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';

@Component({
  selector: 'app-ficha-libro',
  templateUrl: './ficha-libro.component.html',
  styleUrls: ['./ficha-libro.component.css'],
  providers: [LibroService]
})
export class FichaLibroComponent implements OnInit {
  public url: string;
  public libro: Libro;
  public imgUrl = '';
  constructor(
    private _libroService: LibroService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) { 
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params=> {
      let id = params.id;
      this.getFichaLibro(id);
     
    })
  }

  getFichaLibro(id){
    this._libroService.getLibro(id).subscribe(
      response => {
        this.libro = response;
        
      }, error => {
        console.log(<any>error);
        
      }
    );
  }

  deleteLibro(id){
    this.dialogService.openConfirmDialog('¿Deseas borrar el libro?').afterClosed().subscribe(res =>{
      if(res){
    this._libroService.deleteLibro(id).subscribe(
      response => {
        this.showSuccess();
        this._router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=>
          this._router.navigate(['/gestionLibros'])); 
       
        // if(response.libro){
        //   this.showSuccess();
        //   this._router.navigate(['/gestionLibros']);
        // }
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
