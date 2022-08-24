import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-frame1',
  templateUrl: './frame1.component.html',
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class Frame1Component implements OnInit {
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  data: any;
  loading: boolean = true;
  error: boolean = false;
  currentEnabled: string = '';
  currentSelectedValue: string = '';
  totNoOfEmp: any = '';
  totNoOfRes: any = '';
  totNoOfPer: any = '';
  wellBeingQuet: any = '';
  modalRef: BsModalRef | undefined;

  filterBy = [
    {
      db_name: 'age_id',
      name: 'Age',
      responseName: 'ages',
      topValues: 'ages_graph',
      findName: 'age',
    },
    {
      db_name: 'gender_id',
      name: 'Gender',
      responseName: 'genders',
      topValues: 'genders_graph',
      findName: 'gender',
    },
    {
      db_name: 'tenure_id',
      name: 'Tenure',
      responseName: 'tenures',
      topValues: 'tenures_graph',
      findName: 'tenure',
    },
    {
      db_name: 'business_id',
      name: 'Business Unit',
      responseName: 'business_units',
      topValues: 'business_units_graph',
      findName: 'unit',
    },
    {
      db_name: 'level_id',
      name: 'Level',
      responseName: 'levels',
      topValues: 'levels_graph',
      findName: 'level',
    },
    {
      db_name: 'overall_experience_id',
      name: 'Overall Experience',
      responseName: 'overall_experiences',
      topValues: 'overall_experiences_graph',
      findName: 'overall_experience',
    },
  ];
  graphValue: any = [];
  filterValue: any = [];
  wellBeing = [
    {
      name: 'Physical well-being',
      value: 'physical_value',
      trade: 'physical_trade',
      about: 'physical_about',
      state: 'physical_statements',
      insight: 'physical_insight',
      action: 'physical_action',
      active: 'physical_active',
      tactive: 'physical_trade_active',
    },
    {
      name: 'environmental well-being',
      value: 'environmental_value',
      trade: 'environmental_trade',
      about: 'environmental_about',
      state: 'environmental_statements',
      insight: 'environmental_insight',
      action: 'environmental_action',
      active: 'environmental_active',
      tactive: 'environmental_trade_active',
    },
    {
      name: 'intellectual well-being',
      value: 'intellectual_value',
      trade: 'intellectual_trade',
      about: 'intellectual_about',
      state: 'intellectual_statements',
      insight: 'intellectual_insight',
      action: 'intellectual_action',
      active: 'intellectual_active',
      tactive: 'intellectual_trade_active',
    },
    {
      name: 'spiritual well-being',
      value: 'spiritual_value',
      trade: 'spiritual_trade',
      about: 'spiritual_about',
      state: 'spiritual_statements',
      insight: 'spiritual_insight',
      action: 'spiritual_action',
      active: 'spiritual_active',
      tactive: 'spiritual_trade_active',
    },
    {
      name: 'emotional well-being',
      value: 'emotional_value',
      trade: 'emotional_trade',
      about: 'emotional_about',
      state: 'emotional_statements',
      insight: 'emotional_insight',
      action: 'emotional_action',
      active: 'emotional_active',
      tactive: 'emotional_trade_active',
    },
    {
      name: 'social well-being',
      value: 'social_value',
      trade: 'social_trade',
      about: 'social_about',
      state: 'social_statements',
      insight: 'social_insight',
      action: 'social_action',
      active: 'social_active',
      tactive: 'social_trade_active',
    },
    {
      name: 'occupational well-being',
      value: 'occupational_value',
      trade: 'occupational_trade',
      about: 'occupational_about',
      state: 'occupational_statements',
      insight: 'occupational_insight',
      action: 'occupational_action',
      active: 'occupational_active',
      tactive: 'occupational_trade_active',
    },
    {
      name: 'financial well-being',
      value: 'financial_value',
      trade: 'financial_trade',
      about: 'financial_about',
      state: 'financial_statements',
      insight: 'financial_insight',
      action: 'financial_action',
      active: 'financial_active',
      tactive: 'financial_trade_active',
    },
  ];
  wellBeingTot: any = [];

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.loading = true;
    this.error = false;
    this.data = [];
    this.userService
      .getRequestData('')
      .pipe()
      .subscribe(
        (data) => {
          this.loading = false;
          this.error = false;
          if (data.status == 401) {
            this.logout();
          } else {
            this.loading = false;
            this.data = data.data;
            let graphVal: any = [];
            this.filterBy.forEach((value: any) => {
              let key = value.responseName;
              graphVal[key] = this.data.alldetailValues.filter(
                (filterValue: any) => {
                  return filterValue[value.db_name] !== null;
                }
              );
            });
            Object.entries(graphVal).forEach((value: any) => {
              const [key, val] = value;
              let arr: any = this.sortAnArray(val, 'no_of_employees');
              let keys = this.filterBy.find(
                (val: any) => val.responseName === key
              );
              this.graphValue.push({
                name: keys,
                values: graphVal,
                top: arr.slice(0, 3),
                bottom: arr.slice(-3).reverse(),
              });
            });
            this.filterValue = Object.assign(this.graphValue);
            this.totNoOfEmp = this.data.alldetailValues
              .map((item: any) => item.no_of_employees)
              .reduce((prev: any, curr: any) => Number(prev) + Number(curr), 0);
            this.totNoOfRes = this.data.alldetailValues
              .map((item: any) => item.no_of_responses)
              .reduce((prev: any, curr: any) => Number(prev) + Number(curr), 0);
            this.totNoOfPer = (
              (this.totNoOfRes / this.totNoOfEmp) *
              100
            ).toFixed(2);
            this.wellBeingQuet = (
              this.data.alldetailValues
                .map((item: any) => item.well_being_quotient)
                .reduce(
                  (prev: any, curr: any) => Number(prev) + Number(curr),
                  0
                ) / this.data.alldetailValues.length
            ).toFixed(2);
            this.wellBeing.forEach((val: any) => {
              this.wellBeingTot.push(
                (
                  this.data.alldetailValues
                    .map((item: any) => item[val.value])
                    .reduce(
                      (prev: any, curr: any) => Number(prev) + Number(curr),
                      0
                    ) / this.data.alldetailValues.length
                ).toFixed(2)
              );
            });
          }
        },
        (err) => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  sortAnArray(arr: any, key: string) {
    return arr.sort((a: any, b: any) => {
      return a[key] < b[key] ? 1 : a[key] === b[key] ? 0 : -1;
    });
  }

  getValues(arrName: any, id: any, name: any) {
    return this.data.dropDownList[arrName].find((val: any) => val.id === id)[
      name
    ];
  }

  aboutModalcontent: any = '';
  statementModalcontent: any = '';
  insightModalcontent: any = '';
  actionModalcontent: any = '';

  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  @ViewChild('childInsightModal', { static: false })
  childInsightModal?: ModalDirective;
  @ViewChild('childActionModal', { static: false })
  childActionModal?: ModalDirective;

  showChildModal(i: any, forModal = ''): void {
    this.aboutModalcontent =
      this.data.alldetailValues[0][this.wellBeing[i]['about']];
    this.statementModalcontent =
      this.data.alldetailValues[0][this.wellBeing[i]['state']];
    this.insightModalcontent =
      this.data.alldetailValues[0][this.wellBeing[i]['insight']];
    this.actionModalcontent =
      this.data.alldetailValues[0][this.wellBeing[i]['action']];

    if (forModal === 'about') this.childModal?.show();
    if (forModal === 'insight') {
      this.childInsightModal?.show();
    }
    if (forModal === 'action') this.childActionModal?.show();
  }
  hideChildModal(forModal = ''): void {
    if (forModal === 'about') this.childModal?.hide();
    if (forModal === 'insight') this.childInsightModal?.hide();
    if (forModal === 'action') this.childActionModal?.hide();
  }

  customOptions: OwlOptions = {
    items: 7,
    loop: false,
    dots: false,
    nav: false,
  };
  logo = 'assets/images/beats-logo.png';
  imageSrc = 'assets/images/beats.gif';
  height: number = 150;

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    cutout: '70%',
    maintainAspectRatio: false,
  };
  public doughnutChartData: ChartData<any> = {
    labels: [],
    datasets: [
      {
        data: [4.32, 1],
        label: 'My First Dataset',
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 100)'],
      },
    ],
  };

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  dropdownChange(value: string) {
    this.currentEnabled = value;
    this.currentSelectedValue = '';
  }

  dropdownMenuCliked(value: string) {
    this.currentSelectedValue = value;
  }
}
