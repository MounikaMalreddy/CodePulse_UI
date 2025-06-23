import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit {
  addBlogPostForm!: FormGroup;
  currentDate: any;
  constructor(private fb: FormBuilder, private blogpostService: BlogpostService) {
    this.currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  }
  ngOnInit(): void {
    this.addBlogPostForm = this.fb.group({
      title: [''],
      urlHandle: [''],
      shortDescription: [''],
      content: [''],
      featuredImageUrl: [''],
      dateCreated: [this.currentDate],
      author: [''],
      isVisible: [true] // Default to true
    });

  }
  onAddBlogPost():void{
    console.log(this.addBlogPostForm.value);
    this.blogpostService.addBlogPost(this.addBlogPostForm.value).subscribe({
      next: (response) => {
        console.log('Blog post added successfully:', response);
        alert('Blog post added successfully!');
        // Optionally reset the form or navigate to another page
        this.addBlogPostForm.reset();
        this.addBlogPostForm.patchValue({
           dateCreated: [this.currentDate],
           isVisible: [true] 
        });
      },
      error: (error) => {
        alert('Error adding blog post. Please try again.');
        console.error('Error adding blog post:', error);
      }
    }); 
  }
}
