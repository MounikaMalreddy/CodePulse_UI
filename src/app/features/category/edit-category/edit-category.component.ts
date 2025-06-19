import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  id: any;
  editCategoryForm!: FormGroup;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private fb: FormBuilder, private router:Router) { 
       this.editCategoryForm = this.fb.group({
      id: ['', Validators.required],
      name: [''],
      urlHandle: [''],
    });
  }
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
       this.id = params['id'];
      // You can now use the id to fetch the category details or perform other actions
      console.log('Category ID:', this.id);
    })

    this.categoryService.getCategoryById(this.id).subscribe({
      next: (data) => {
        console.log('Category Data:', data);
        this.editCategoryForm.patchValue(data);
        // Handle the category data as needed
      },
      error: (error) => {
        console.error('Error fetching category:', error);
        // Handle the error as needed
      }
    });
  }
  onUpdateCategory(): void {
    if (this.editCategoryForm.valid) {
      let obj={
        name: this.editCategoryForm.value.name,
        urlHandle: this.editCategoryForm.value.urlHandle,
      };
      this.categoryService.updateCategory(this.id, obj).subscribe({
        next: () => {
          alert('Category updated successfully');
          this.editCategoryForm.reset();
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.error('Error updating category:', err);
          alert('Failed to update category');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
