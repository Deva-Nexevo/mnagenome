import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughchart.component.html',
})
export class DoughchartComponent implements OnInit {
  ngOnInit(): void {}
  public height: number = 100;
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
