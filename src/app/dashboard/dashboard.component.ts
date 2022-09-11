import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  logo = 'assets/images/beats-logo.png';
  imageSrc = 'assets/images/beats.gif';
  text = '';
  environment: any = environment;

  constructor(
    public userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.text =
      this.currentUser.frame_id === 3
        ? 'DEI DASHBOARD'
        : 'EMPLOYEE WELL-BEING DASHBOARD';
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
