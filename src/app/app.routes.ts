import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'blog/:url',
    loadComponent: () =>
      import('./features/public/blog-details/blog-details.component').then(
        (m) => m.BlogDetailsComponent
      ),
  },
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('./features/category/category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
  },
  {
    path: 'admin/categories/add',
    loadComponent: () =>
      import('./features/category/add-category/add-category.component').then(
        (m) => m.AddCategoryComponent
      ),
  },
  {
    path: 'admin/categories/:id',
    loadComponent: () =>
      import('./features/category/edit-category/edit-category.component').then(
        (m) => m.EditCategoryComponent
      ),
  },
  {
    path: 'admin/blogposts',
    loadComponent: () =>
      import('./features/blogpost/blogpost-list/blogpost-list.component').then(
        (m) => m.BlogpostListComponent
      ),
  },
  {
    path: 'admin/blogposts/add',
    loadComponent: () =>
      import('./features/blogpost/add-blogpost/add-blogpost.component').then(
        (m) => m.AddBlogpostComponent
      ),
  },
  {
    path: 'admin/blogposts/:id',
    loadComponent: () =>
      import('./features/blogpost/edit-blogpost/edit-blogpost.component').then(
        (m) => m.EditBlogpostComponent
      ),
  },
];
