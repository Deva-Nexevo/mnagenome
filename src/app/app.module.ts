import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarchartComponent } from './barchart/barchart.component';
import { DoughchartComponent } from './doughchart/doughchart.component';
import { Frame1Component } from './frame1/frame1.component';
import { Frame2Component } from './frame2/frame2.component';
import { Frame3Component } from './frame3/frame3.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { LoginComponent } from './login/login.component';
import { PieChartComponent } from './piechart/piechart.component';
import { RadarchartComponent } from './radarchart/radarchart.component';
import { WordcloudComponent } from './wordcloud/wordcloud.component';

import {
  ErrorInterceptor,
  fakeBackendProvider,
  JwtInterceptor,
} from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    LoginComponent,
    Frame1Component,
    Frame2Component,
    Frame3Component,
    DoughchartComponent,
    BarchartComponent,
    RadarchartComponent,
    HeatmapComponent,
    WordcloudComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule,
    MatMenuModule,
    NgChartsModule,
    HighchartsChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
