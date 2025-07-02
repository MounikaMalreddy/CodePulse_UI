import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private _http: HttpClient) {}
  private apiUrl = 'https://localhost:7248/api/BlogImage/';
  selectedImage: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  uploadImage(file: File, fileName: string, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // key must match IFormFile parameter name

    //https://localhost:7248/api/BlogImage/UploadImage?fileName=sun&title=flower
    return this._http.post<any>(
      this.apiUrl + 'UploadImage?' + 'fileName=' + fileName + '&title=' + title,
      formData
    );
  }
  getAllBlogImages(): Observable<any> {
    return this._http.get<any>(this.apiUrl + 'GetAllBlogImages');
  }
  selectImage(image: any): void {
    this.selectedImage.next(image);
  }
  onSelectImage(): Observable<any> {
    return this.selectedImage.asObservable();
  }
}
