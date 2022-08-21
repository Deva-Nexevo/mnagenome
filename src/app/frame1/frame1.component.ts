import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  ngOnInit(): void {}

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
}
