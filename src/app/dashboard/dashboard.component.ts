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
  logo = 'assets/images/beats-logo.png';
  imageSrc = 'assets/images/new-logo.gif';
  text = '';
  environment: any = environment;
  currentUser: User;

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
    let text = "Do you want to logout?";
    if (confirm(text) == true) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    } 
  }
}
