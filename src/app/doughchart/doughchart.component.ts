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
      cutout: '60%',
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
          backgroundColor: [
            this.value > 4.5
              ? 'rgb(0,100,0)'
              : this.value > 3.5
              ? 'rgb(255,140,0)'
              : 'rgb(139, 0, 0)',
            'rgb(211,211,211)',
          ],
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
