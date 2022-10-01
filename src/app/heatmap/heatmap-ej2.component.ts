import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heatmapgraph',
  template: `<ejs-heatmap
    style="display:block;"
    id="{{ id }}"
    [dataSource]="dataSource"
    [xAxis]="xAxis"
    [yAxis]="yAxis"
    [titleSettings]="titleSettings"
    [paletteSettings]="paletteSettings"
    [legendSettings]="legendSettings"
    [showTooltip]="showTooltip"
    [height]="height"
    [cellSettings]="cellSettings"
  >
  </ejs-heatmap>`,
  // encapsulation: ViewEncapsulation.None,
})
export class HeatMapEj2Component implements OnInit {
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
  @Input() id: any = '';

  showTooltip: boolean = true;
  dataSource: Object[] = [];
  titleSettings: Object = {};
  xAxis: Object = {};
  yAxis: Object = {};
  paletteSettings: Object = {};
  legendSettings: Object = {};
  cellSettings: Object = {};
  height: any = '';
  font: any = '';

  isPresentInData(id: any) {
    return this.data.findIndex((val: any) => val[this.dbName] === id);
  }

  ngOnInit() {
    let xData: any = [];
    let yData: any = [];
    let data: any = [];
    let indexData: any = [];

    this.xData.forEach((val: any) => {
      const str = val.name.split(' ')[0];
      xData.push(str.charAt(0).toUpperCase() + str.slice(1));
    });

    this.yData.forEach((val: any, index: number) => {
      const currentIndex = this.isPresentInData(val.id);
      if (currentIndex > -1) {
        yData.push(val[this.searchName]);
        indexData.push(currentIndex);
      }
    });

    this.xData.forEach((val1: any, index1: any) => {
      let datNewValue: number[] = [];
      yData.forEach((val: any, index: number) => {
        datNewValue.push(
          Number(this.data[indexData[index]][this.xData[index1]['key']])
        );
      });
      data.push(datNewValue);
    });

    (this.height = (yData.length * 25 + 130).toString()),
      (this.dataSource = data);

    this.titleSettings = {
      text: 'Heat-Map for ' + this.name,
    };

    this.xAxis = {
      labels: xData,
    };
    this.yAxis = {
      labels: yData,
    };
    this.paletteSettings = {
      palette: [
        { color: this.minColorHeat ? this.minColorHeat : '#FF0000' },
        { color: this.middleColorHeat ? this.middleColorHeat : '#FFFF00' },
        { color: this.maxColorHeat ? this.maxColorHeat : '#00FF00' },
      ],
      type: 'Gradient',
    };
    this.legendSettings = {
      visible: true,
      position: 'Bottom',
      width: '25%',
    };
    this.cellSettings = {
      showLabel: false,
      enableCellHighlighting: false,
    };
    this.font = {
      size: '10px',
      fontStyle: 'italic',
    };
  }
}
