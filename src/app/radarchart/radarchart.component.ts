import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'radar-chart',
  templateUrl: './radarchart.component.html',
})
export class RadarchartComponent implements OnInit {
  ngOnInit(): void {}
  public height: number = 500;
  public radarChartType: ChartType = 'radar';
  public radarChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };
  public radarChartData: ChartData<any> = {
    labels: [
      'EASY',
      'ENGAGED',
      'FUN',
      'HAPPY',
      'MANAGABLE',
      'ANGER',
      'ANEXITY',
      'DEPPERSSION',
      'FEAR',
      'FRUSTATION',
    ],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };
}
