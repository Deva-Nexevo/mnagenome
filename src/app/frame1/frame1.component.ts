import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-frame1',
  templateUrl: './frame1.component.html',
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class Frame1Component implements OnInit {
  data: any;
  loading: boolean = false;
  currentEnabled: string = '';
  currentSelectedValue: string = '';

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.loading = true;
    this.data = [];
    this.userService
      .getRequestData('')
      .pipe()
      .subscribe((data) => {
        if (data.status == 401) {
          this.logout();
        } else {
          this.loading = false;
          this.data = data.data;
          console.log(this.data);
        }
      });
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  customOptions: OwlOptions = {
    items: 7,
    loop: false,
    dots: false,
    nav: false,
  };
  logo = 'assets/images/beats-logo.png';
  imageSrc = 'assets/images/beats.gif';
  height: number = 150;

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    cutout: '70%',
    maintainAspectRatio: false,
  };
  public doughnutChartData: ChartData<any> = {
    labels: [],
    datasets: [
      {
        data: [4.32, 1],
        label: 'My First Dataset',
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 100)'],
      },
    ],
  };

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  dropdownChange(value: string) {
    this.currentEnabled = value;
    this.currentSelectedValue = '';
  }

  dropdownMenuCliked(value: string) {
    this.currentSelectedValue = value;
  }
}
