import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-heatmapapex',
  templateUrl: './heatmapapex.component.html',
  styleUrls: [],
})
export class HeatmapapexComponent implements OnInit {
  @Input() data: any = [];
  @Input() color: any = [];
  @Input() name: any = '';
  @Input() xData: any = [];
  @Input() yData: any = [];
  @Input() searchName: any = '';
  @Input() dbName: any = '';
  @Input() minColorHeat: any = '';
  @Input() maxColorHeat: any = '';
  @Input() middleColorHeat: any = '';
  @Input() colorRange: any = '';
  height: any = '';

  @ViewChild('chart') chart: any;
  public chartOptions: any;
  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }
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

  ngOnInit(): void {
    let xData: any = [];
    let data: any = [];
    let yData: any = [];
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
        const currentArr: any = [];
        this.xData.forEach((val1: any, index1: any) => {
          currentArr.push({
            x: xData[index1],
            y: this.data[currentIndex][this.xData[index1]['key']] || 0,
          });
        });
        data.push({
          name: val[this.searchName],
          data: currentArr,
        });
        yDataIndex++;
      }
    });

    this.chartOptions = {
      series: data,
      responsive: [
        {
          breakpoint: 360,
        },
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: yData.length * 25 + 142,
        width: '100%',
        type: 'heatmap',
        selection: {
          enabled: false,
        },
      },
      legend: {
        onItemHover: {
          highlightDataSeries: false,
        },
      },
      states: {
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
          },
        },
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: ['rgb(51, 51, 51)'],
            fontSize: '12px',
            fontFamily: 'ProximaNova-Regular',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label-new',
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: ['rgb(51, 51, 51)'],
            fontSize: '12px',
            fontFamily: 'ProximaNova-Regular',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label-new',
          },
        },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: this.colorRange?.color1_start_value! || 0,
                to: this.colorRange?.color1_end_value! || 2,
                name: 'low',
                color: this.minColorHeat || '#FF0000',
              },
              {
                from: this.colorRange?.color2_start_value! || 3,
                to: this.colorRange?.color2_end_value! || 4,
                name: 'medium',
                color: this.middleColorHeat || '#000000',
              },
              {
                from: this.colorRange?.color3_start_value! || 4,
                to: this.colorRange?.color3_end_value! || 5,
                name: 'high',
                color: this.maxColorHeat || '#00FF00',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Heat-Map for ' + this.name,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'normal',
          fontFamily: 'ProximaNova-Regular',
          color: 'rgb(51, 51, 51)',
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '5px',
          fontFamily: 'ProximaNova-Regular',
        },
        marker: {
          show: false,
        },
      },
    };
  }
}
