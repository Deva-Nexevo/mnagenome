import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'radar-chart',
  templateUrl: './radarchart.component.html',
})
export class RadarchartComponent implements OnInit {
  @Input() data: any = [];
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
    datasets: [{}],
  };

  ngOnInit(): void {
    this.radarChartData = {
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
          label: '',
          data: this.data,
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
}
