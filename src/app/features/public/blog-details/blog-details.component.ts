import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{
  url:any;
  blogPost:any;

  constructor(private route:ActivatedRoute,
    private blogService: BlogpostService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.url = params.get('url');
      // You can now use this.url to fetch the blog post details
      console.log('Blog URL:', this.url);
    });
    if (this.url) {
      this.blogService.getBlogPostByUrlHandle(this.url)
      .subscribe({
        next: (data) => {
          console.log('Blog Post Details:', data);
          this.blogPost = data;
        },
        error: (error) => {
          console.error('Error fetching blog post details:', error);
          // Handle the error here
        }
      });
    }
  }

}
