import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {
  blogPosts$!: Observable<any[]>;

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

  onDeleteBlogPost(blogPostId: string): void {
    this.blogPostService.deleteBlogPost(blogPostId).subscribe({
      next: () => {
        console.log(`Blog post with ID ${blogPostId} deleted successfully.`);
        // Refresh the list after deletion
        this.blogPosts$ = this.blogPostService.getAllBlogPosts();
      }
      , error: (error) => {
        console.error(`Error deleting blog post with ID ${blogPostId}:`, error);
      }
    });
  }

}
