import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css',
})
export class ImageSelectorComponent implements OnInit {
  private file!:File;
  uploadBlogImageForm!: FormGroup;
  constructor(private fb: FormBuilder, private imageService:ImageService) {}
  ngOnInit(): void {
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
      this.imageService.uploadImage(this.file, fileName, title)
        .subscribe({
          next: (response) => {
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
}
