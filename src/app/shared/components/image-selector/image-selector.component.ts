import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css',
})
export class ImageSelectorComponent implements OnInit {
  private file!:File;
  uploadBlogImageForm!: FormGroup;
  blogImagesList$!: Observable<any>;
  constructor(private fb: FormBuilder, private imageService:ImageService) {}
  ngOnInit(): void {
    this.getBlogImages();
    this.uploadBlogImageForm = this.fb.group({
      title: [''],
      fileName: [''],
    });
  }
  onFileUploadChange(event: Event): void {
    console.log('File upload triggered');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      console.log('Selected file:', this.file);
      // Here you can handle the file upload logic, e.g., send it to a server
    } else {
      console.log('No file selected');
    }
  }
  UploadFile(): void {
    if (this.uploadBlogImageForm.valid && this.file) {
      const title= this.uploadBlogImageForm.get('title')?.value;
      const fileName = this.uploadBlogImageForm.get('fileName')?.value;
      console.log(this.file);
      console.log(title);
      console.log(fileName);
      this.imageService.uploadImage(this.file, fileName, title)
        .subscribe({
          next: (response) => {
            this.uploadBlogImageForm.reset(); // Reset the form after successful upload
            this.getBlogImages(); 
            console.log('File uploaded successfully:', response);
          },
          error: (error) => {
            console.error('Error uploading file:', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }

  onImageSelect(image: any): void {
    console.log('Selected image:', image);
    this.imageService.selectImage(image);
  }
  
  private getBlogImages(): void {
    this.blogImagesList$ = this.imageService.getAllBlogImages();
  }
}
