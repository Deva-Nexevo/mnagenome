import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'bar-chart',
  templateUrl: './barchart.component.html',
})
export class BarchartComponent implements OnInit {
  @Input() data: any = [];
  @Input() label: any = [];
  public height: number = 500;
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  public barChartData: ChartData<any> = {
    datasets: [{}],
  };

  ngOnInit(): void {
    this.barChartData = {
      labels: [
        'Very Happy',
        'Happy',
        'Neither Happy or Sad',
        'Sad',
        'Very Sad',
      ],
      datasets: [
        {
          label: '',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
