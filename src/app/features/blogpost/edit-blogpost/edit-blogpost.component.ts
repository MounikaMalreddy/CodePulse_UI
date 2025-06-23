import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css',
})
export class EditBlogpostComponent implements OnInit {
  id: string | null = null;
  blogPost: any;
  updateBlogPostForm!: FormGroup;
  currentDate: any;
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogpostService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  }
  ngOnInit(): void {
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
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.id = id;
        console.log(`Editing blog post with ID: ${id}`);
        this.blogPostService.getBlogPostById(id).subscribe(
          (blogPost) => {
            console.log('Blog post data:', blogPost);
            blogPost.dateCreated = new Date(blogPost.dateCreated)
              .toISOString()
              .split('T')[0]; // Convert date to YYYY-MM-DD format
            this.updateBlogPostForm.patchValue(blogPost);
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
      this.blogPostService
        .updateBlogPost(this.id!, this.updateBlogPostForm.value)
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
}
