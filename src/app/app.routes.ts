import { Routes } from '@angular/router';

export const routes: Routes = [
   
    { path: 'admin/categories', loadComponent: () => import('./features/category/category-list/category-list.component').then(m => m.CategoryListComponent) },
    { path: 'admin/categories/add', loadComponent: () => import('./features/category/add-category/add-category.component').then(m => m.AddCategoryComponent) },
    {path: 'admin/categories/:id', loadComponent: () => import('./features/category/edit-category/edit-category.component').then(m => m.EditCategoryComponent) },
];
