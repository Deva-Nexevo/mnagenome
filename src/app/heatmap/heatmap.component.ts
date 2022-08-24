import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_heatmap from 'highcharts/modules/heatmap';
HC_heatmap(Highcharts);

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent {
  @Input() data: any = [];
  @Input() name: any = '';
  @Input() xData: any = [];
  @Input() yData: any = [];

  getPointCategoryName(point: any, dimension: any) {
    var series = point.series,
      isY = dimension === 'y',
      axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
  }

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      width: 1000,
    },
    title: {
      text: 'Heat-Map for' + this.name,
    },

    xAxis: {
      categories: [
        'Alexander',
        'Marie',
        'Maximilian',
        'Sophia',
        'Lukas',
        'Maria',
        'Leon',
        'Anna',
        'Tim',
        'Laura',
      ],
    },

    yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },

    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: '#FF0000',
    },

    series: [
      {
        name: this.name,
        borderWidth: 1,
        type: 'heatmap',
        data: [
          [0, 0, 10],
          [0, 1, 19],
          [0, 2, 8],
          [0, 3, 24],
          [0, 4, 67],
          [1, 0, 92],
          [1, 1, 58],
          [1, 2, 78],
          [1, 3, 117],
          [1, 4, 48],
          [2, 0, 35],
          [2, 1, 15],
          [2, 2, 123],
          [2, 3, 64],
          [2, 4, 52],
          [3, 0, 72],
          [3, 1, 132],
          [3, 2, 114],
          [3, 3, 19],
          [3, 4, 16],
          [4, 0, 38],
          [4, 1, 5],
          [4, 2, 8],
          [4, 3, 117],
          [4, 4, 115],
          [5, 0, 88],
          [5, 1, 32],
          [5, 2, 12],
          [5, 3, 6],
          [5, 4, 120],
          [6, 0, 13],
          [6, 1, 44],
          [6, 2, 88],
          [6, 3, 98],
          [6, 4, 96],
          [7, 0, 31],
          [7, 1, 1],
          [7, 2, 82],
          [7, 3, 32],
          [7, 4, 30],
          [8, 0, 85],
          [8, 1, 97],
          [8, 2, 123],
          [8, 3, 64],
          [8, 4, 84],
          [9, 0, 47],
          [9, 1, 114],
          [9, 2, 31],
          [9, 3, 48],
          [9, 4, 91],
        ],
      },
    ],
  };
}
