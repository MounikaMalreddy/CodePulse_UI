import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  categoriesCountList: number[] = [];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCategoriesCount();
  }
  private getCategoriesCount(): void {
    this.categoryService.getCategoriesCount().subscribe({
      next: (count) => {
        console.log('Total categories count:', count);
        this.totalCategoriesCount = count;
        this.categoriesCountList = new Array(
          Math.ceil(this.totalCategoriesCount / this.pageSize)
        );
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
        this.getCategoriesCount();
        this.toastr.success('Category deleted successfully', 'Success');
      },
      error: (err) => {
        this.toastr.error('Failed to delete category', 'Error');
        console.error('Error deleting category:', err);
      },
    });
  }
  onSearch(filterQuery: string): void {
    this.categories$ = this.categoryService.getCategories(
      filterQuery,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
  sort(sortBy: string, sortDirection: string): void {
    this.categories$ = this.categoryService.getCategories(
      undefined,
      sortBy,
      sortDirection,
      this.pageNumber,
      this.pageSize
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
    if (this.pageNumber + 1 > this.categoriesCountList.length) {
      return;
    }
    this.pageNumber += 1;
    this.categories$ = this.categoryService.getCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
  getPrevPage(): void {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1;
    this.categories$ = this.categoryService.getCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
}
