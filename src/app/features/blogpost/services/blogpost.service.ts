import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  private apiUrl = 'https://localhost:7248/api/BlogPost';
  constructor(private _http:HttpClient) { }

  addBlogPost(blogPost: any):Observable<any> {
    return this._http.post<any>(this.apiUrl+'/AddBlogPost', blogPost);
  }
  getAllBlogPosts(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl + '/GetAllBlogPosts');
  }
}
