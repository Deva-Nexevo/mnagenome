import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'pie-chart',
  templateUrl: './piechart.component.html',
})
export class PieChartComponent implements OnInit {
  public chartOptions: Highcharts.Options = {};
  @Input() data: any = [];
  @Input() name: any = '';
  @Input() dropDownData: any = [];
  @Input() db_name: any = [];

  findValue(id: any) {
    return this.dropDownData.find((val: any) => val.id === id)[
      this.name.findName
    ];
  }
  ngOnInit(): void {
    const data: any = [];
    const totalNoOfEmployee = this.data
      .map((item: any) => item.no_of_employees)
      .reduce((prev: any, curr: any) => prev + curr, 0);

    this.data.forEach((val: any) => {
      data.push({
        name: this.findValue(val[this.name.db_name]),
        y: val.no_of_employees / totalNoOfEmployee,
      });
    });

    this.chartOptions = {
      chart: {
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: this.name.name,
      },
      tooltip: {
        pointFormat: '{series.name}: {point.percentage:.1f}% of total',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Age',
          colorByPoint: true,
          data: data,
        },
      ],
    };
  }

  Highcharts: typeof Highcharts = Highcharts;
}
