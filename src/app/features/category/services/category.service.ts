import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // apiUrl =`${environment.apiBaseUrl}Category/`;
  // private apiUrl = environment.apiBaseUrl + 'Category/';
  private apiUrl = 'https://localhost:7248/api/Category/';

  constructor(private _http: HttpClient) {}

  addCategory(category: any): Observable<void> {
    return this._http.post<void>(`${this.apiUrl}AddCategory`, category);
  }
  //https://localhost:7248/api/Category/GetAllCategories?sortBy=name&sortDirection=des
  //https://localhost:7248/api/Category/GetAllCategories?pageNumber=1&pageSize=5
  getCategories(
    filterQuery?: string,
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<any[]> {
    const url = `${this.apiUrl}GetAllCategories?filterQuery=${filterQuery}&sortBy=${sortBy}&sortDirection=${sortDirection}
    &pageNumber=${pageNumber}&pageSize=${pageSize}`;
    console.log('URL:', url);
    return this._http.get<any[]>(url);
  }
  getCategoryById(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}GetCategoryById/${id}`);
  }
  updateCategory(id: string, category: any): Observable<void> {
    return this._http.put<void>(
      `${this.apiUrl}UpdateCategoryById/${id}`,
      category
    );
  }
  deleteCategory(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}DeleteCategoryById/${id}`);
  }
  getCategoriesCount(): Observable<number> {
    return this._http.get<number>(`${this.apiUrl}GetCategoriesCount`);
  }
}
