import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadCvService {


  apiURL: string=environment.url+"/fichier";

  constructor(private http:HttpClient) {
  }

  downloadFile(blob: Blob, filename: string, type = 'application/pdf'): void {
    if (blob?.type != null) {
      type = blob?.type;
    }
    console.log('download');
    const file = new Blob([blob], { type });
    console.log(file);
    const url = window.URL.createObjectURL(file);
    console.log(url);
    const element = document.createElement('a');
    element.href = url;
    element.download = filename;
    document.body.appendChild(element);
    console.log(element);
    element.click();
  }

  getFileCV(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiURL+'/download-file/cv', { observe: 'response', responseType: 'blob' })
      .subscribe((res:any)=>{
        resolve(res);
      },
      (err:any)=>{
        reject(err);
      })
    })

  }

  getFileLetrre(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiURL+'/download-file/lettre', { observe: 'response', responseType: 'blob' })
      .subscribe((res:any)=>{
        resolve(res);
      },
      (err:any)=>{
        reject(err);
      })
    })

  }

  downloadFileCvByUuid(uuid:string){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiURL+'/download-file/cv',uuid ,{ observe: 'response', responseType: 'blob' })
      .subscribe((res:any)=>{
        resolve(res);
      },
      (err:any)=>{
        reject(err);
      })
    })

  }

  downloadFileLettreByUuid(uuid:string){
    return new Promise((resolve,reject)=>{
      this.http.post(this.apiURL+'/download-file/lettre',uuid ,{ observe: 'response', responseType: 'blob' })
      .subscribe((res:any)=>{
        resolve(res);
      },
      (err:any)=>{
        reject(err);
      })
    })

  }
  
  
  
  createCV(formData : FormData){
    return new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      let params=new HttpParams();
      headers.set("Content-Type","");
      headers.set("Accept","multipart/form-data");
        this.http.post(this.apiURL+"/create/cv",formData,{params,headers}).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }

  
  createLettre(formData : FormData){
    return new Promise((resolve, reject) => {
      let headers=new HttpHeaders();
      let params=new HttpParams();
      headers.set("Content-Type","");
      headers.set("Accept","multipart/form-data");
        this.http.post(this.apiURL+"/create/lettre",formData,{params,headers}).subscribe(
            (res) => {
                resolve(res);
            },
            (err) => {
                reject(err);
            }
        )
    })
  }


  
  checkExistence(type:string){
    return new Promise((resolve,reject)=>{
      this.http.get(this.apiURL+"/exist/"+type)
      .subscribe((res:any)=>{
        resolve(res);
      },
      (err:any)=>{
        reject(err);
      })
    })

  }


}
