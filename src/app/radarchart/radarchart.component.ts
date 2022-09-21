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
    plugins: {
      legend: {
        display: false,
      },
    },
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
    const bgColor: any = [];
    this.data.forEach((val: any) => {
      bgColor.push(
        val > 4.5
          ? 'rgb(0,100,0)'
          : val > 3.5
          ? 'rgb(255,140,0)'
          : 'rgb(139, 0, 0)'
      );
    });
    this.radarChartData = {
      labels: [
        'EASY 😇 ',
        'ENGAGED 🧐 ',
        'FUN 🤗 ',
        'HAPPY 😀',
        'MANAGABLE 🙂 ',
        'ANGER 😡 ',
        'ANXIETY 😓 ',
        'DEPRESSION 😖',
        'FEAR 😰 ',
        'FRUSTRATION 😤 ',
      ],
      datasets: [
        {
          labels: [
            'EASY 😇 ',
            'ENGAGED 🧐 ',
            'FUN 🤗 ',
            'HAPPY 😀',
            'MANAGABLE 🙂 ',
            'ANGER 😡 ',
            'ANXIETY 😓 ',
            'DEPRESSION 😖',
            'FEAR 😰 ',
            'FRUSTRATION 😤 ',
          ],
          data: this.data,
          backgroundColor: ['#074B6E'],
          borderColor: ['#e1e1e1'],
          pointBackgroundColor: bgColor,
        },
      ],
    };
  }
}
