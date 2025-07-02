import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  blogPostList$!: Observable<any[]>;
  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogPostList$= this.blogPostService.getAllBlogPosts();
    // Initialization logic can go here
  }

}
