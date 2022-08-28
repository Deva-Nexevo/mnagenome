import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_wordcloud from 'highcharts/modules/wordcloud';
HC_wordcloud(Highcharts);

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['wordcloud.component.css'],
})
export class WordcloudComponent {
  public activity: any;
  public xData: any;
  public label: any;
  options: any;
  @Input() data: any = '';

  constructor() {}

  ngOnInit() {
    var data1: any = [];
    this.data[0].forEach((val: any, index: any) => {
      data1.push({ name: val, weight: this.data[1][index] });
    });
    var arr1 = [];
    for (let i = 0; i < data1.length; i++) {
      arr1.push(data1[i]);
    }
    for (let i = 0; i < data1.length; i++) {
      for (let j = 1; j < data1[i].weight; j++) {
        arr1.push(data1[i]);
      }
    }
    var data = arr1;

    this.options = {
      series: [
        {
          type: 'wordcloud',
          data: data,
        },
      ],
      title: {
        text: '',
      },
    };
    Highcharts.chart('container', this.options);
  }
}
