import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'access',
    loadChildren: () => import('./features/access/access.module').then(m => m.AccessModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'access' },
  { path: '**', redirectTo: 'access' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
