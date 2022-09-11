import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'bar-chart',
  templateUrl: './barchart.component.html',
})
export class BarchartComponent implements OnInit {
  @Input() data: any = [];
  @Input() label: any = [];
  @Input() chartFor: any = '';
  public height: number = 500;
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: 'x',
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
    this.height = this.chartFor === '' ? 500 : 200;
    this.barChartType = 'bar';
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: this.chartFor === '' ? 'x' : 'y',
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const backgroundColor: any = [];

    this.data.forEach((val: any) => {
      backgroundColor.push(
        val > 4.5
          ? 'rgb(0,100,0)'
          : val > 3.5
          ? 'rgb(255,140,0)'
          : 'rgb(139, 0, 0)'
      );
    });

    const labels: any =
      this.chartFor === 'oltj'
        ? ['Organization', 'Leadership', 'Team', 'Job']
        : ['Very Happy', 'Happy', 'Neither Happy or Sad', 'Sad', 'Very Sad'];

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: backgroundColor.splice(0, this.data.length),
        },
      ],
    };
  }
}
