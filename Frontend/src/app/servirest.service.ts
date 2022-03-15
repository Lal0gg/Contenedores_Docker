import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServirestService {


  // IP y port donde esta el  backend en el contenedor, cambiar
  private ip:string = "http://192.168.137.1:3000";

  constructor( private http: HttpClient) { }

  public get(url:string){
    return this.http.post(url,undefined);
  }

  public obtener_datos(url:string,operacion:number,datos:any): Observable<any>{
    let para = JSON.stringify(datos);
    let cabezera = new HttpHeaders().set('Content-Type','application/json');
    if(operacion == 0){
       return this.http.get(this.ip+url);
    }
    else if(operacion == 1){
      return this.http.post(this.ip+url,para,{headers: cabezera});
    }

    return this.http.post(url,undefined);
  }

}
