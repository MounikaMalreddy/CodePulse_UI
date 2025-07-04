import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<any[]>;
  id: any;
  totalCategoriesCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 5;
  categoriesCountList:number[] =[];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategoriesCount().subscribe({
      next: (count) => {
        console.log('Total categories count:', count);
        this.totalCategoriesCount = count;
        this.categoriesCountList = new Array(
          Math.ceil(this.totalCategoriesCount / this.pageSize));
        this.categories$ = this.categoryService.getCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
      error: (err) => {
        console.error('Error fetching categories count:', err);
      },
    });
  }
  onDeleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully');
        this.categories$ = this.categoryService.getCategories(); // Refresh the list
      },
      error: (err) => {
        console.error('Error deleting category:', err);
        alert('Failed to delete category');
      },
    });
  }
  onSearch(filterQuery: string): void {
    this.categories$ = this.categoryService.getCategories(filterQuery);
  }
  sort(sortBy: string, sortDirection: string): void {
    this.categories$ = this.categoryService.getCategories(
      undefined,
      sortBy,
      sortDirection
    );
  }
  getPage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.categories$ = this.categoryService.getCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
  getNextPage(): void {
    if(this.pageNumber+1> this.categoriesCountList.length){
      return;
    }
    this.pageNumber+=1;
    this.categories$ = this.categoryService.getCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
  getPrevPage(): void {
    if(this.pageNumber-1<1){
      return;
    }
    this.pageNumber-=1;
    this.categories$ = this.categoryService.getCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
}
