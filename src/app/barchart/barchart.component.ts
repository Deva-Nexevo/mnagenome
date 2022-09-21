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
  public barChartOptions: ChartConfiguration<any>['options'] = {};
  public barChartData: ChartData<any> = {
    datasets: [{}],
  };

  ngOnInit(): void {
    this.height = this.chartFor === '' ? 500 : 200;
    this.barChartType = 'bar';
    this.barChartOptions = {
      hover: { mode: null },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: this.chartFor === '' ? 'x' : 'y',
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 100,
              },
            },
          ],
        },
      },
    };
    if (this.chartFor !== 'oltj') {
      this.barChartOptions['plugins']['tooltip'] = {
        backgroundColor: (context: any) => {
          return context.tooltipItems.length > 0
            ? context.tooltipItems[0].dataset.backgroundColor[
                context.tooltipItems[0].dataIndex
              ]
            : '';
        },
        displayColors: false,
        position: 'nearest',
        callbacks: {
          before: (context: any) => {
            return '';
          },
          label: (context: any) => {
            let label = context.label.split(',')[0];
            return ` ${label}: ${context.formattedValue}`;
          },
          title: (context: any) => {
            return ``;
          },
        },
      };
    }

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
        : [
            ['😊', '', 'Very Happy'],
            ['🙂', '', 'Happy'],
            ['😶', '', 'Neither Happy or Sad'],
            ['😑', '', 'Sad'],
            ['🥺', '', 'Very Sad'],
          ];

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: this.data,
          backgroundColor:
            this.chartFor === 'oltj'
              ? backgroundColor.splice(0, this.data.length)
              : ['#69B34C', '#ACB334', '#fcce14', '#FF4E11', '#ff0d0d'],
        },
      ],
    };
  }
}
