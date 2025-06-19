import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories$!: Observable<any[]>;
  id:any;
  constructor(private categoryService: CategoryService,private route: ActivatedRoute) { 

  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
  onDeleteCategory(id:string):void{
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully');
        this.categories$ = this.categoryService.getCategories(); // Refresh the list
      },
      error: (err) => {
        console.error('Error deleting category:', err);
        alert('Failed to delete category');
      }
    });
  }

}
