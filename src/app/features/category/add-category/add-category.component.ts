import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  addCategoryForm!:FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router,
    private toastr: ToastrService
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      urlHandle: ['']
    });
  }
  onAddCategory():void {
    if(this.addCategoryForm.valid){
      this.categoryService.addCategory(this.addCategoryForm.value).subscribe({
        next: () => {
          this.addCategoryForm.reset();
          this.router.navigate(['/admin/categories']);
          this.toastr.success('Category added successfully toast', 'Success');
        },
        error: (err) => {
          console.error('Error adding category:', err);
          this.toastr.error('Failed to add category', 'Error');
        }
      })
    }
  }

  
}

