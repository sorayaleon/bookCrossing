import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro';
import { LibroService } from '../../../Services/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../shared/dialog.service';
import { EstablecimientoService } from '../../../Services/establecimiento.service';

@Component({
  selector: 'app-update-libro',
  templateUrl: './update-libro.component.html',
  styleUrls: ['./update-libro.component.css'],
  providers: [LibroService]
})
export class UpdateLibroComponent implements OnInit {
  public title: string;
  public libro: Libro;
  public selectedLibro: Libro;
  public status: string;
  public filesToUpload: Array<File>;
  public updateLibro;
  public formularioLibro: FormGroup;//Creo el objeto de tipo FormGroup
  public categoriaList: string[];
  public establecimiento: any;

  constructor(
    private _libroService: LibroService,
    public fb: FormBuilder, //Objeto para la validación de los campos
    private _route: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private _establecimientoService: EstablecimientoService,
  ) {
    this.title = "Actualizar Libro";

    this.formularioLibro = this.fb.group({
      isbn: ['',[Validators.required, Validators.pattern(/^(?:ISBN(?:-1[03])?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)(?:97[89][-\ ]?)?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]$/)]],
      titulo: ['',[Validators.required, Validators.maxLength(50)]],
      autor: ['',[Validators.pattern(/^[a-zá-ú\s]+$/i),Validators.maxLength(50)]],
      portada: '',
      sinopsis:['',[Validators.required, Validators.maxLength(1000)]],
      categoria: ['', Validators.required],
      establecimiento: ['', Validators.required],
    })


   }

  ngOnInit() {
    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       console.log(this.establecimiento);

       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
     );

    this.categoriaList = ['Arte','Autoayuda', 'Aventuras', 'Bélico', 'Ciencia Ficción', 'Ciencias Exactas', 'Ciencias Naturales', 'Ciencias Sociales', 'Comunicación', 'Drama', 'Fantasía', 'Filosofía', 'Histórico', 'Humor', 'Idiomas', 'Infantil', 'Suspense', 'Terror', 'Policiaco'];
    //Recojo los parámetros que llegan por la url
    this._route.params.subscribe(params=> {
      let id = params.id;

      this.getFichaLibro(id);
    })
  }

  getFichaLibro(id){
    this._libroService.getLibro(id).subscribe(
      response => {   
        console.log("Entro en response");
        console.log(response);
        this.libro = response;
        
        //this.formularioLibro.setValue(response);
        
      }, error => {
        
        console.log(<any>error);
      }
    );
  }

  onSubmit(){
    console.log("ENTRA EN SUBMIT");
    console.log(this.libro);
    console.log(this.formularioLibro.value);
    console.log(this.formularioLibro.value.portada);

    this.dialogService.openConfirmDialog('¿Deseas actualizar el libro?').afterClosed().subscribe(res =>{
      if(res){
        this._libroService.updateLibro(this.libro.id, this.formularioLibro.value, this.formularioLibro.value.portada).subscribe(
          response=>{
            console.log(response);
            this.showSuccess();
            this._router.navigate(['/gestionLibros']);
          },
     
         error => {
           console.log("estoy en error");
           this.showError();
           console.log(<any>error);
         });
      }
    });

    
  }

  fileChangeEvent(event){
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(this.formularioLibro);
      reader.onload = () => {
        this.formularioLibro.get('portada').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(",")[1]
        });
      };
    }

  }

  showSuccess(){
    this.toastr.success('El libro ha sido actualizado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El libro no se ha actualizado.', 'Error', {timeOut: 3000})
  }
}
