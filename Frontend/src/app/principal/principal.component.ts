import { Component, OnInit } from '@angular/core';
import { ServirestService } from '../servirest.service';
import { ToastrService } from 'ngx-toastr';

export interface NewUser{
  nombre: string;
  edad: number;
  correo: string;
  genero: string;
  adicional: string;
}

export interface UpdateUser{
  id: any;
  nombre: string;
  edad: number;
  correo: string;
  genero: string;
  adicional: string
}

export interface DeleteUser{
  id: any
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})


export class PrincipalComponent implements OnInit {


  datos = []; // lista de los datos 
  displayedColumns: string[] = ['ID','Nombre','Genero','Edad','Correo','Info Adicional'];
  idp = 0;
  public Nombretxt : string = "";
  public Edadtxt: string = "";
  public Generotxt: string = "";
  public Correotxt: string = "";
  public Adicionaltxt: string = "";
  public SelectUser: string = "";
  arreglo : any;

  constructor(private servicio: ServirestService, private toastr: ToastrService) {
      this.cargar_lista();
   }

  ngOnInit(): void {
  }

  cargar_lista(){
     this.servicio.obtener_datos("/get_ids",0,undefined).subscribe((resp: any) =>{
       this.arreglo = resp.result;
       console.log(this.arreglo);
     });
  }

  onChange(event: any){
    this.idp = event;
    
    this.obtener_datos(this.idp);
  }

  private obtener_datos(dato: any){
     let identificador: DeleteUser = {
       id: this.idp
     };
     this.servicio.obtener_datos("/get_user",1,identificador).subscribe((resp: any) =>{
      console.log(resp); 
      this.Nombretxt = resp[0].nombre;
       this.Edadtxt = resp[0].edad;
       this.Correotxt = resp[0].correo;
       this.Generotxt = resp[0].genero;
       this.Adicionaltxt = resp[0].adicional;
     });
  }

  agregar(){
    let registro: NewUser ={
      nombre: this.Nombretxt,
      edad: Number(this.Edadtxt),
      genero: this.Generotxt,
      correo: this.Correotxt,
      adicional: this.Adicionaltxt
    }

    this.servicio.obtener_datos("/insertar",1,registro).subscribe((resp:any) =>{
       if(resp.codigo == 200){
         this.toastr.success("Se añadió el usuario","Correcto");
       }
       else{
         this.toastr.error("No se puede agregar, correo repetido","Error")
       }
    });
  }

  modificar(){
    let modificacion: UpdateUser ={
      id: this.idp,
      nombre: this.Nombretxt,
      edad: Number(this.Edadtxt),
      genero: this.Generotxt,
      correo: this.Correotxt,
      adicional: this.Adicionaltxt
    }
    this.servicio.obtener_datos("/update",1,modificacion).subscribe((resp: any) =>{
      console.log(resp.codigo); 
      if(resp.codigo == 200){
         this.toastr.success("Usuario modificado","Correcto")
       }
       else{
         this.toastr.error("No se puede actualizar el usuario, correo repetitivo","Error")
       }
    });
  }

  eliminar(){
    let eliminacion: DeleteUser ={
      id: this.idp
    }
    this.servicio.obtener_datos("/delete",1,eliminacion).subscribe((resp: any) =>{
       if(resp.codigo == 200){
         this.toastr.success("Se efectuó la eliminacion","Correcto")
       }
       else{
         this.toastr.error("No existe el id a eliminar","Error")
       }
    });
  }

  mostrar_tabla(){
    this.datos = [];
    this.servicio.obtener_datos("/gettodos",0,undefined).subscribe((resp: any) =>{
      this.datos = resp.result;
      console.log(this.datos);
    });
  }

}
