import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughchart.component.html',
})
export class DoughchartComponent implements OnInit {
  ngOnInit(): void {
    this.doughnutChartOptions = {
      responsive: true,
      cutout: '70%',
      maintainAspectRatio: false,
      events: [],
      plugins: {
        title: {
          display: true,
          text: this.title.toUpperCase(),
        },
      },
    };
    this.doughnutChartData = {
      labels: [],
      datasets: [
        {
          data: [this.value, 5 - this.value],
          label: 'My First Dataset',
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 100)'],
        },
      ],
    };
  }
  @Input() title: any = '';
  @Input() value: any = '';

  public height: number = 150;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<any>['options'] = {};

  public doughnutChartData: ChartData<any> = {
    labels: [],
    datasets: [],
  };
}
