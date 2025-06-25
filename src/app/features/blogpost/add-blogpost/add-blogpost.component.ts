import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css',
})
export class AddBlogpostComponent implements OnInit {
  addBlogPostForm!: FormGroup;
  currentDate: any;
  categoriesList$!: Observable<any[]>;
  constructor(
    private fb: FormBuilder,
    private blogpostService: BlogpostService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  }
  ngOnInit(): void {
    this.categoriesList$ = this.categoryService.getCategories();
    this.addBlogPostForm = this.fb.group({
      title: [''],
      urlHandle: [''],
      shortDescription: [''],
      content: [''],
      featuredImageUrl: [''],
      dateCreated: [this.currentDate],
      author: [''],
      isVisible: [true], // Default to true
      categories: [],
    });
  }
  onAddBlogPost(): void {
    console.log(this.addBlogPostForm.value);
    this.blogpostService.addBlogPost(this.addBlogPostForm.value).subscribe({
      next: (response) => {
        console.log('Blog post added successfully:', response);
        alert('Blog post added successfully!');
        // Optionally reset the form or navigate to another page
        this.router.navigate(['/admin/blogposts']);
        this.addBlogPostForm.reset();
        this.addBlogPostForm.patchValue({
          dateCreated: [this.currentDate],
          isVisible: [true],
        });
      },
      error: (error) => {
        alert('Error adding blog post. Please try again.');
        console.error('Error adding blog post:', error);
      },
    });
  }
}
