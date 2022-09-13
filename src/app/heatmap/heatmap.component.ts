import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_heatmap from 'highcharts/modules/heatmap';
import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
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
  environment: any = environment;
  currentUser: User;

  isPresentInData(id: any) {
    return this.data.findIndex((val: any) => val[this.dbName] === id);
  }

  constructor(
    private authenticationService: AuthenticationService,
    public userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
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

    let yDataIndex = 0;
    this.yData.forEach((val: any, index: number) => {
      const currentIndex = this.isPresentInData(val.id);
      if (currentIndex > -1) {
        yData.push(val[this.searchName]);
        this.xData.forEach((val1: any, index1: any) => {
          data.push({
            x: index1,
            y: yDataIndex,
            value: this.data[currentIndex][this.xData[index1]['key']],
            /* color:
              this.data[currentIndex][this.xData[index1]['key']] > 4.5
                ? 'rgb(0,100,0)'
                : this.data[currentIndex][this.xData[index1]['key']] > 3.5
                ? 'rgb(255,140,0)'
                : 'rgb(139, 0, 0)', */
          });
        });
        yDataIndex++;
      }
    });

    this.chartOptions = {
      title: {
        text: 'Heat-Map for ' + this.name,
      },
      chart: {
        height: yData.length * 25 + 142,
      },
      colorAxis: {
        min: 0,
        minColor: this.currentUser.color1 ? this.currentUser.color1 : '#FFFFFF',
        maxColor: this.currentUser.color2 ? this.currentUser.color2 : '#FF0000',
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
