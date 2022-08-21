import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Frame1Component } from './frame1/frame1.component';
import { Frame2Component } from './frame2/frame2.component';
import { Frame3Component } from './frame3/frame3.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'frame1',
    component: Frame1Component,
  },
  {
    path: 'frame2',
    component: Frame2Component,
  },
  {
    path: 'frame3',
    component: Frame3Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
