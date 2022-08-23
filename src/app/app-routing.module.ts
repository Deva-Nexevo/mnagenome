import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Frame1Component } from './frame1/frame1.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: '',
    component: Frame1Component,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'frame1',
    component: Frame1Component,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
