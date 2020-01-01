import { Component, OnInit } from '@angular/core';
import { Establecimiento } from '../../../models/establecimiento';
import { EstablecimientoService } from '../../../Services/establecimiento.service';
import { Global } from '../../../Services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-establecimiento',
  templateUrl: './usuario-establecimiento.component.html',
  styleUrls: ['./usuario-establecimiento.component.css'],
  providers: [EstablecimientoService]
})
export class UsuarioEstablecimientoComponent implements OnInit {
  public url: string;
  public establecimiento: Establecimiento;

  constructor(
    private _establecimientoService: EstablecimientoService,
    private route: ActivatedRoute,
  ) {
    this.url = Global.url;
   }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      let id = params.id;
      console.log(id)
      this.getFichaEstablecimiento(id);
     
    })
  }

  getFichaEstablecimiento(id){
    this._establecimientoService.getEstablecimiento(id).subscribe(
      response => {
        this.establecimiento = response;
        
      }, error => {
        console.log(<any>error);
        
      }
    );
  }

}
