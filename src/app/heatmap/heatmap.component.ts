import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_heatmap from 'highcharts/modules/heatmap';
HC_heatmap(Highcharts);

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
})
export class HeatmapComponent implements OnInit {
  @Input() data: any = [];
  @Input() name: any = '';
  @Input() xData: any = [];
  @Input() yData: any = [];
  @Input() searchName: any = '';
  @Input() dbName: any = '';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  isPresentInData(id: any) {
    return this.data.some((val: any) => val[this.dbName] === id);
  }

  ngOnInit() {
    let xData: any = [];
    let yData: any = [];
    let data: any = [];

    this.xData.forEach((val: any) => {
      const str = val.name.split(' ')[0];
      xData.push(str.charAt(0).toUpperCase() + str.slice(1));
    });

    this.yData.forEach((val: any) => {
      if (this.isPresentInData(val.id)) yData.push(val[this.searchName]);
    });

    this.data.forEach((val: any, index: any) => {
      this.xData.forEach((val1: any, index1: any) => {
        data.push([index1, index, val[this.xData[index1]['value']]]);
      });
    });

    this.chartOptions = {
      chart: {
        width: 1000,
      },
      title: {
        text: 'Heat-Map for' + this.name,
      },

      xAxis: {
        categories: xData,
      },

      yAxis: {
        categories: yData,
      },

      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#FF0000',
      },

      series: [
        {
          borderWidth: 1,
          type: 'heatmap',
          data: data,
        },
      ],
    };
  }
}
