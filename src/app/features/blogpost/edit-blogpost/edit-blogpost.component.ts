import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css',
})
export class EditBlogpostComponent implements OnInit {
  id: string | null = null;
  blogPost: any;
  updateBlogPostForm!: FormGroup;
  currentDate: any;
  categoriesList$!: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogpostService,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  }
  ngOnInit(): void {
    this.categoriesList$ = this.categoryService.getCategories();
    this.updateBlogPostForm = this.fb.group({
      id: [''],
      title: [''],
      urlHandle: [''],
      shortDescription: [''],
      content: [''],
      featuredImageUrl: [''],
      dateCreated: [this.currentDate],
      author: [''],
      isVisible: [true], // Default to true
      categories: [],
      selectedCategories: [[]], // Initialize as an empty array
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.id = id;
        console.log(`Editing blog post with ID: ${id}`);
        this.blogPostService.getBlogPostById(id).subscribe(
          (blogPost) => {
            const selectedIds = blogPost.categories.map((x: any) => x.id); // Extract category IDs
            console.log('selectedCategories:', selectedIds);
            console.log('Blog post data:', blogPost);
            blogPost.dateCreated = new Date(blogPost.dateCreated)
              .toISOString()
              .split('T')[0]; // Convert date to YYYY-MM-DD format
            this.updateBlogPostForm.patchValue({
              ...blogPost,
              selectedCategories: selectedIds, // ✅ PATCH the category IDs
            });
            console.log(
              'Form values after patch:',
              this.updateBlogPostForm.value
            );
          },
          (error) => {
            console.error('Error fetching blog post:', error);
          }
        );
      } else {
        console.error('No ID provided for editing blog post');
      }
    });
  }

  onUpdateBlogPost(): void {
    if (this.updateBlogPostForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!this.id) {
      alert('Blog post ID is missing.');
      return;
    }
    if (this.updateBlogPostForm.valid && this.id) {
      console.log('Form is valid. Proceeding with update...');
      }
      const formData = {
        ...this.updateBlogPostForm.value,
        categories: this.updateBlogPostForm.value.selectedCategories
      };
      console.log('Form data to be sent:', formData);
      this.blogPostService
        .updateBlogPost(this.id!, formData)
        .subscribe({
          next: (response) => {
            console.log('Blog post updated successfully:', response);
            alert('Blog post updated successfully!');
            this.router.navigate(['/admin/blogposts']);
          },
          error: (error) => {
            console.error('Error updating blog post:', error);
            alert('Failed to update blog post. Please try again.');
          },
        });
    }
  }

