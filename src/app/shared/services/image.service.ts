import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private _http: HttpClient) {}
  private apiUrl = 'https://localhost:7248/api/BlogImage/';

  uploadImage(file: File, fileName:string, title:string):Observable<any> {
    const formData = new FormData();
  formData.append('file', file); // key must match IFormFile parameter name

    //https://localhost:7248/api/BlogImage/UploadImage?fileName=Flowers&title=Nice%20Flower
    return this._http.post<any>(this.apiUrl+'UploadImage?' +'fileName='+fileName+ +'fileName='+fileName+'&title='+title,formData);

  }
  uploadImage2(file: File, fileName: string, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this._http.post<any>(`${this.apiUrl}UploadImage`, formData);
  }
}
