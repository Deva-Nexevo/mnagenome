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
  @Input() color: any = [];
  @Input() name: any = '';
  @Input() xData: any = [];
  @Input() yData: any = [];
  @Input() searchName: any = '';
  @Input() dbName: any = '';
  height: any = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  isPresentInData(id: any) {
    return this.data.findIndex((val: any) => val[this.dbName] === id);
  }

  ngOnInit() {
    let xData: any = [];
    let yData: any = [];
    let data: any = [];

    this.xData
      .sort(function (a: any, b: any) {
        return a.id - b.id;
      })
      .forEach((val: any) => {
        const str = val.name.split(' ')[0];
        xData.push(str.charAt(0).toUpperCase() + str.slice(1));
      });

    this.yData.forEach((val: any, index: number) => {
      const currentIndex = this.isPresentInData(val.id);
      if (currentIndex > -1) {
        yData.push(val[this.searchName]);
        this.xData.forEach((val1: any, index1: any) => {
          data.push({
            x: index1,
            y: index,
            value: this.data[currentIndex][this.xData[index1]['key']],
            color:
              this.data[currentIndex][this.xData[index1]['key']] > 4.5
                ? 'rgb(0,100,0)'
                : this.data[currentIndex][this.xData[index1]['key']] > 3.5
                ? 'rgb(255,140,0)'
                : 'rgb(139, 0, 0)',
          });
        });
      }
    });

    this.chartOptions = {
      title: {
        text: 'Heat-Map for ' + this.name,
      },
      chart: {
        height: yData.length * 50 + 84,
      },
      xAxis: {
        categories: xData,
        title: {
          text: '',
        },
      },
      yAxis: {
        categories: yData,
        title: {
          text: '',
        },
      },
      series: [
        {
          showInLegend: false,
          borderWidth: 1,
          type: 'heatmap',
          data: data,
        },
      ],
    };
  }
}
