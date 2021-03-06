import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../../Services/libro.service';
import { Libro } from '../../../models/libro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { AuthService } from '../../../Services/auth.service';
import { TokenService } from '../../../Services/token.service';

@Component({
  selector: 'app-create-libro',
  templateUrl: './create-libro.component.html',
  styleUrls: ['./create-libro.component.css'],
  providers: [LibroService]
})
export class CreateLibroComponent implements OnInit {
  public title: string;
  public libro: Libro;
  public status: string;
  public filesToUpload: Array<File>;
  public saveLibro;
  public formularioLibro: FormGroup;//Creo el objeto de tipo FormGroup
  public categoriaList: string[];
  public categoriaEst: string[];
  public establecimiento: any;
  public tipoUsu;

  
  constructor(
    private _establecimientoService: EstablecimientoService,
    private _libroService: LibroService,
    public fb: FormBuilder, //Objeto para la validación de los campos
    private toastr: ToastrService,
    private _router: Router,
    private auth: AuthService,
    private Token: TokenService,
    
  ) {
    this.title = "Crear Libro";
    this.libro = new Libro(0, 0 , '' , '', '', '', '', '', '', '', 0);
    this.createForm();
    // /b(?:ISBN(?:: ?| ))?((?:97[89])?d{9}[dx])b/i

    this.formularioLibro = this.fb.group({
      portada: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      isbn: ['',[Validators.required, Validators.pattern(/^(?:ISBN(?:-1[03])?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)(?:97[89][-\ ]?)?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]$/)]],
      titulo: ['',[Validators.required, Validators.maxLength(50)]],
      autor: ['',[Validators.required, Validators.pattern(/^[a-zá-ú\s]+$/i), Validators.maxLength(50)]],
      sinopsis:['',[Validators.required, Validators.maxLength(250)]],
      categoria: ['', Validators.required],
      establecimiento: ['', Validators.required],
    });
   }

  ngOnInit() {
    this.tipoUsu = sessionStorage.getItem("tipo");
    
    this._establecimientoService.getEstablecimientos().subscribe(
      result => {
       this.establecimiento = result;
       for(let index=0; index<this.establecimiento.length; index ++){
         if(this.establecimiento[index]["estado"]== "activo"){
           this.categoriaEst.push(this.establecimiento[index]);
         }
       }
       console.log(this.establecimiento);

       console.log(<any>result);
     },
     error => {
       console.log(<any>error);
     }
  );
    this.categoriaList = ['Arte','Autoayuda', 'Aventuras', 'Bélico', 'Ciencia Ficción', 'Ciencias Exactas', 'Ciencias Naturales', 'Ciencias Sociales', 'Comunicación', 'Drama', 'Fantasía', 'Filosofía', 'Histórico', 'Humor', 'Idiomas', 'Infantil', 'Suspense', 'Terror', 'Policiaco'];
    
  }

  onSubmit(form){
    console.log(this.formularioLibro.value);
    this._libroService.saveLibro(this.libro, this.formularioLibro.value.portada).subscribe(
      response => {
        this.status='success';
        this.saveLibro = response.libro;
        this.showSuccess();
        this._router.navigate(['/gestionLibros']);
      }, error => {
        this.status = 'failed';
        console.log(<any>error);
        this.showError();
      }
    )
  }
  redireccion(){
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }

  createForm(){
    this.formularioLibro = this.fb.group({
      portada: null,
      
    })
  }

  fileChangeEvent(event){
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
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
    this.toastr.success('El libro ha sido insertado con éxito.', 'Correcto', {timeOut: 3000});
  }

  showError(){
    this.toastr.error('El libro no se ha insertado.', 'Error', {timeOut: 3000})
  }

//   isbn(formularioRegistro) {
//     return ISBN.Validate(formularioRegistro.get('isbn').value) == true
//        ? null : {'isbn': true};
//  }
}
