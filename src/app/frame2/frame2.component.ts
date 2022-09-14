import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-frame2',
  templateUrl: './frame2.component.html',
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class Frame2Component implements OnInit {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  @ViewChild('childInsightModal', { static: false })
  childInsightModal?: ModalDirective;
  @ViewChild('childActionModal', { static: false })
  childActionModal?: ModalDirective;
  @ViewChild('openTextModal', { static: false }) openTextModal?: ModalDirective;
  @ViewChild('oltjModal', { static: false }) oltjModal?: ModalDirective;
  data: any;
  loading: boolean = true;
  wordLoading: boolean = false;
  error: boolean = false;
  currentEnabled: string = '';
  currentSelectedValue: string = '';
  currentSelectedDbName: string = '';
  currentSelectedId: number = 0;
  currentSelectedGraphName: string = '';
  totNoOfEmp: any = '';
  totNoOfRes: any = '';
  totNoOfPer: any = '';
  wellBeingQuet: any = '';
  modalRef: BsModalRef | undefined;
  aboutModalcontent: any = '';
  statementModalcontent: any = '';
  insightModalcontent: any = '';
  actionModalcontent: any = '';
  height: number = 150;
  graphValue: any = [];
  filterValue: any = [];
  wellBeingTot: any = [];
  wellBeingTrade: any = [];
  employeeFeeling: any = [];
  employeeMood: any = [];
  wordCloudData: string = '';
  category: any = [];
  opentextvalues: any = [];
  selectedOpentext: number = 0;
  openVal: any = [];
  overviewResponse: any = [];
  dropDownList: any = [];
  staticInsightData: any;
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
      db_name: 'tenure_month_id',
      name: 'Tenures (In Months)',
      responseName: 'tenure_in_months',
      topValues: 'tenure_in_months_graph',
      findName: 'tenuremonth',
    },
    {
      db_name: 'tech_business_id',
      name: 'Tech / Business',
      responseName: 'tech_business',
      topValues: 'tech_business_graph',
      findName: 'business_tech',
    },
  ];
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
      key: 'physical',
      insightactive: 'physical_insight_action_active',
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
      key: 'environmental',
      insightactive: 'environmental_insight_action_active',
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
      key: 'intellectual',
      insightactive: 'intellectual_insight_action_active',
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
      key: 'spiritual',
      insightactive: 'spiritual_insight_action_active',
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
      key: 'emotional',
      insightactive: 'emotional_insight_action_active',
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
      key: 'social',
      insightactive: 'social_insight_action_active',
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
      key: 'occupational',
      insightactive: 'occupational_insight_action_active',
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
      key: 'financial',
      insightactive: 'financial_insight_action_active',
    },
  ];

  wellBeingHeatMap = [
    {
      name: 'Organization',
      value: 'organization',
      key: 'organization',
    },
    {
      name: 'Leadership',
      value: 'leadership',
      key: 'leadership',
    },
    {
      name: 'Team',
      value: 'team',
      key: 'team',
    },
    {
      name: 'Physical well-being',
      value: 'physical_value',
      key: 'physical',
    },
    {
      name: 'occupational well-being',
      value: 'occupational_value',
      key: 'occupational',
    },
    {
      name: 'spiritual well-being',
      value: 'spiritual_value',
      key: 'spiritual',
    },
  ];

  sumOfAllData: any = {
    organization: 0,
    leadership: 0,
    team: 0,
    job: 0,
    no_of_employees: 0,
    no_of_responses: 0,
    veryhappy: 0,
    happy: 0,
    neitherhappy: 0,
    sad: 0,
    verysad: 0,
    easy: 0,
    engaged: 0,
    fun: 0,
    managable: 0,
    anger: 0,
    anxiety: 0,
    depression: 0,
    fear: 0,
    frustation: 0,
    feeling_happy: 0,
    beats_quotient: 0,
  };
  oltjData: any = [
    {
      name: 'organization',
      db_col_name: 'organization_insight',
      db_col_name1: 'organization_action',
    },
    {
      name: 'leadership',
      db_col_name: 'leadership_insight',
      db_col_name1: 'leadership_action',
    },
    {
      name: 'team',
      db_col_name: 'team_insight',
      db_col_name1: 'team_action',
    },
    {
      name: 'job',
      db_col_name: 'job_insight',
      db_col_name1: 'job_action',
    },
  ];

  heatMapData: any = [
    {
      name: 'organization',
      db_col_name: 'organization_insight',
      db_col_name1: 'organization_action',
    },
    {
      name: 'leadership',
      db_col_name: 'leadership_insight',
      db_col_name1: 'leadership_action',
    },
    {
      name: 'team',
      db_col_name: 'team_insight',
      db_col_name1: 'team_action',
    },
    {
      name: 'job',
      db_col_name: 'job_insight',
      db_col_name1: 'job_action',
    },
  ];
  oltj: any = [];
  oltjContent: any = {};
  environment: any = environment;
  currentUser: User;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private scroller: ViewportScroller
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.getAllData();
  }

  goDown(id: any) {
    this.scroller.scrollToAnchor(id);
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
            this.filterBy.forEach((value: any) => {
              let key = value.responseName;
              this.graphValue[key] = this.data.alldetailValues.filter(
                (filterValue: any) => {
                  return filterValue[value.db_name] !== null;
                }
              );
            });
            this.staticInsightData = this.data.staticInsight;
            Object.entries(this.graphValue).forEach((value: any) => {
              const [key, val] = value;
              let arr: any = this.sortAnArray(val, 'no_of_employees');
              let keys = this.filterBy.find(
                (val: any) => val.responseName === key
              );
              this.overviewResponse.push({
                name: keys,
                values: val,
                top: arr.slice(0, 3),
                bottom: arr.slice(-3).reverse(),
              });
              this.dropDownList[key] = this.data.dropDownList[key].filter(
                (filterValue: any) => {
                  return val.find(
                    (val: any) => val[keys?.db_name!] === filterValue.id
                  );
                }
              );
            });

            this.calculateAllValues();
            this.category = this.data.category;
            this.data.opentextvalues.forEach((value: any) => {
              value['category_name'] = this.category.find((val: any) => {
                return Number(val.id) === Number(value.category);
              })?.category_name;
              var a = value.category_list;
              a.push(value.wordname);
              var b = value.category_count;
              b.push(value.wordvalue);
              value['word_cloud'] = [a, b];
            });
            this.opentextvalues = this.data.opentextvalues;
            this.openVal =
              this.opentextvalues[this.selectedOpentext]?.word_cloud;
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

  getStaticInsight(
    i: any = '',
    dimension: string = '',
    keyString: string = ''
  ) {
    let score =
      this.wellBeingTot[i] > 4.5
        ? 'high'
        : this.wellBeingTot[i] > 3.5
        ? 'medium'
        : 'low';

    let findVal =
      this.staticInsightData.find((val: any) => {
        return (
          val.dimension.toLowerCase().trim() ==
            dimension.toLowerCase().trim() &&
          score.trim().toLowerCase() == val.score.trim().toLowerCase()
        );
      }) || [];
    return findVal?.hasOwnProperty(keyString) ? findVal[keyString] : '';
  }

  showChildModal(i: any, forModal = '', data: any = ''): void {
    this.oltjContent = {
      insight: '',
      action: '',
    };

    if (forModal !== 'oltj' && this.currentSelectedGraphName === '') {
      this.aboutModalcontent =
        this.data.alldetailValues[0][this.wellBeing[i]['about']];
      this.statementModalcontent =
        this.data.alldetailValues[0][this.wellBeing[i]['state']];
      this.insightModalcontent =
        this.data.alldetailValues[0][this.wellBeing[i]['insightactive']] == 2 ||
        this.data.alldetailValues[0][this.wellBeing[i]['insight']] == null
          ? this.getStaticInsight(i, this.wellBeing[i].key, 'insight')
          : this.data.alldetailValues[0][this.wellBeing[i]['insight']];
      this.actionModalcontent =
        this.data.alldetailValues[0][this.wellBeing[i]['insightactive']] == 2 ||
        this.data.alldetailValues[0][this.wellBeing[i]['action']] == null
          ? this.getStaticInsight(i, this.wellBeing[i].key, 'action')
          : this.data.alldetailValues[0][this.wellBeing[i]['action']];
    }

    if (forModal !== 'oltj' && this.currentSelectedGraphName) {
      let item = this.graphValue[this.currentSelectedGraphName].find(
        (val: any) => val[this.currentSelectedDbName] === this.currentSelectedId
      );
      this.aboutModalcontent = item[this.wellBeing[i]['about']];
      this.statementModalcontent = item[this.wellBeing[i]['state']];
      this.insightModalcontent =
        item[this.wellBeing[i]['insightactive']] == 2 ||
        item[this.wellBeing[i]['insight']] == null
          ? this.getStaticInsight(i, this.wellBeing[i].key, 'insight')
          : item[this.wellBeing[i]['insight']];
      this.actionModalcontent =
        item[this.wellBeing[i]['insightactive']] == 2 ||
        item[this.wellBeing[i]['action']] == null
          ? this.getStaticInsight(i, this.wellBeing[i].key, 'action')
          : item[this.wellBeing[i]['action']];
    }

    if (forModal === 'oltj' && this.currentSelectedGraphName) {
      let item = this.graphValue[this.currentSelectedGraphName].find(
        (val: any) => val[this.currentSelectedDbName] === this.currentSelectedId
      )?.id;
      let org_item = this.data.oltj_data.find(
        (val: any) => val.row_id === item
      );
      if (org_item) {
        this.oltjContent = {
          insight:
            org_item[data.db_col_name] === null
              ? ''
              : org_item[data.db_col_name],
          action:
            org_item[data.db_col_name1] === null
              ? ''
              : org_item[data.db_col_name1],
        };
      }
    }

    if (forModal === 'oltj' && this.currentSelectedGraphName === '') {
      let org_item = this.data.oltj_data[0];
      if (org_item) {
        this.oltjContent = {
          insight:
            org_item[data.db_col_name] === null
              ? ''
              : org_item[data.db_col_name],
          action:
            org_item[data.db_col_name1] === null
              ? ''
              : org_item[data.db_col_name1],
        };
      }
    }

    console.log(this.oltjContent);

    if (forModal === 'openText') this.openTextModal?.show();
    if (forModal === 'about') this.childModal?.show();
    if (forModal === 'insight') this.childInsightModal?.show();
    if (forModal === 'action') this.childActionModal?.show();
    if (forModal === 'oltj') this.oltjModal?.show();
  }

  hideChildModal(forModal = '', clickedText = -1): void {
    if (forModal === 'about') this.childModal?.hide();
    if (forModal === 'insight') this.childInsightModal?.hide();
    if (forModal === 'action') this.childActionModal?.hide();
    if (forModal === 'oltj') this.oltjModal?.hide();
    if (forModal === 'openText') {
      this.openTextModal?.hide();
      if (clickedText > -1) this.selectedOpentext = clickedText;
      this.wordLoading = true;
      setTimeout(() => {
        this.openVal = this.opentextvalues[this.selectedOpentext]?.word_cloud;
        this.wordLoading = false;
      });
    }
  }

  dropdownChange(value: string) {
    this.currentEnabled = value;
    this.currentSelectedValue = '';
    this.currentSelectedId = 0;
    this.currentSelectedDbName = '';
    this.currentSelectedGraphName = '';
    this.calculateAllValues();
  }

  dropdownMenuCliked(
    value: string,
    db_name: string = '',
    db_id: number = 0,
    graphName: string
  ) {
    this.currentSelectedValue = value;
    this.currentSelectedId = db_id;
    this.currentSelectedDbName = db_name;
    this.currentSelectedGraphName = graphName;
    this.calculateAllValues();
  }

  isPresentInData(name: any, colName: any, id: any) {
    return this.graphValue[name].some((val: any) => val[colName] === id);
  }

  initializeValue() {
    this.sumOfAllData['no_of_employees'] = 0;
    this.sumOfAllData['no_of_responses'] = 0;
    this.sumOfAllData['veryhappy'] = 0;
    this.sumOfAllData['happy'] = 0;
    this.sumOfAllData['neitherhappy'] = 0;
    this.sumOfAllData['sad'] = 0;
    this.sumOfAllData['verysad'] = 0;
    this.sumOfAllData['easy'] = 0;
    this.sumOfAllData['engaged'] = 0;
    this.sumOfAllData['fun'] = 0;
    this.sumOfAllData['managable'] = 0;
    this.sumOfAllData['anger'] = 0;
    this.sumOfAllData['anxiety'] = 0;
    this.sumOfAllData['depression'] = 0;
    this.sumOfAllData['fear'] = 0;
    this.sumOfAllData['frustation'] = 0;
    this.sumOfAllData['feeling_happy'] = 0;
    this.sumOfAllData['beats_quotient'] = 0;

    this.sumOfAllData['organization'] = 0;
    this.sumOfAllData['leadership'] = 0;
    this.sumOfAllData['team'] = 0;
    this.sumOfAllData['job'] = 0;
  }

  calculateAllValues() {
    if (this.currentEnabled === '') {
      this.loading = true;
      setTimeout(() => {
        this.initializeValue();
        this.data.alldetailValues.forEach((item: any) => {
          let org_item = this.data.oltj_data.find(
            (val: any) => val.row_id === item['id']
          );
          this.sumOfAllData['no_of_employees'] =
            Number(this.sumOfAllData['no_of_employees']) +
            Number(item['no_of_employees']);
          this.sumOfAllData['no_of_responses'] =
            Number(this.sumOfAllData['no_of_responses']) +
            Number(item['no_of_responses']);
          this.sumOfAllData['veryhappy'] =
            this.sumOfAllData['veryhappy'] + item['veryhappy'];
          this.sumOfAllData['happy'] =
            this.sumOfAllData['happy'] + item['happy'];
          this.sumOfAllData['neitherhappy'] =
            this.sumOfAllData['neitherhappy'] + item['neitherhappy'];
          this.sumOfAllData['sad'] = this.sumOfAllData['sad'] + item['sad'];
          this.sumOfAllData['verysad'] =
            this.sumOfAllData['verysad'] + item['verysad'];
          this.sumOfAllData['easy'] = this.sumOfAllData['easy'] + item['easy'];
          this.sumOfAllData['engaged'] =
            this.sumOfAllData['engaged'] + item['engaged'];
          this.sumOfAllData['fun'] = this.sumOfAllData['fun'] + item['fun'];
          this.sumOfAllData['managable'] =
            this.sumOfAllData['managable'] + item['managable'];
          this.sumOfAllData['anger'] =
            this.sumOfAllData['anger'] + item['anger'];
          this.sumOfAllData['anxiety'] =
            this.sumOfAllData['anxiety'] + item['anxiety'];
          this.sumOfAllData['depression'] =
            this.sumOfAllData['depression'] + item['depression'];
          this.sumOfAllData['fear'] = this.sumOfAllData['fear'] + item['fear'];
          this.sumOfAllData['frustation'] =
            this.sumOfAllData['frustation'] + item['frustation'];
          this.sumOfAllData['feeling_happy'] =
            this.sumOfAllData['feeling_happy'] + item['feelinghappy'];
          this.sumOfAllData['beats_quotient'] =
            this.sumOfAllData['beats_quotient'] + item['beats_quotient'];
          if (org_item) {
            this.sumOfAllData['organization'] =
              this.sumOfAllData['organization'] +
              Number(org_item['organization_value']);
            this.sumOfAllData['leadership'] =
              this.sumOfAllData['leadership'] +
              Number(org_item['leadership_value']);
            this.sumOfAllData['team'] =
              this.sumOfAllData['team'] + Number(org_item['team_value']);
            this.sumOfAllData['job'] =
              this.sumOfAllData['job'] + Number(org_item['job_value']);
          } else {
            this.sumOfAllData['organization'] =
              this.sumOfAllData['organization'] + 0;
            this.sumOfAllData['leadership'] =
              this.sumOfAllData['leadership'] + 0;
            this.sumOfAllData['team'] = this.sumOfAllData['team'] + 0;
            this.sumOfAllData['job'] = this.sumOfAllData['job'] + 0;
          }
        });
        this.sumOfAllData['beats_quotient'] = Number(
          this.sumOfAllData['beats_quotient'] /
            (this.data.alldetailValues.length * 5)
        ).toFixed(2);
        this.totNoOfEmp = this.sumOfAllData['no_of_employees'];
        this.totNoOfRes = this.sumOfAllData['no_of_responses'];
        this.totNoOfPer = Number(
          (Number(this.totNoOfRes) / Number(this.totNoOfEmp)) * 100
        ).toFixed(2);
        this.wellBeingQuet = Number(
          this.data.alldetailValues
            .map((item: any) => item.well_being_quotient)
            .reduce((prev: any, curr: any) => Number(prev) + Number(curr), 0) /
            this.data.alldetailValues.length
        ).toFixed(2);
        this.wellBeingTot = [];
        this.wellBeingTrade = [];
        this.wellBeing.forEach((val: any) => {
          this.wellBeingTot.push(
            this.data.alldetailValues.length > 0
              ? (
                  this.data.alldetailValues
                    .map((item: any) => item[val.value])
                    .reduce(
                      (prev: any, curr: any) => Number(prev) + Number(curr),
                      0
                    ) / this.data.alldetailValues.length
                ).toFixed(2)
              : 0
          );
          this.wellBeingTrade.push(
            this.data.alldetailValues.length > 0
              ? (
                  this.data.alldetailValues
                    .map((item: any) =>
                      item[val.tactive] == 1 ? item[val.trade] : 0
                    )
                    .reduce((prev: any, curr: any) => {
                      return Number(prev) + Number(curr);
                    }, 0) / this.data.alldetailValues.length
                ).toFixed(2)
              : 0
          );
        });
        this.employeeMood = [
          this.sumOfAllData['veryhappy'] / this.data.alldetailValues.length,
          this.sumOfAllData['happy'] / this.data.alldetailValues.length,
          this.sumOfAllData['neitherhappy'] / this.data.alldetailValues.length,
          this.sumOfAllData['sad'] / this.data.alldetailValues.length,
          this.sumOfAllData['verysad'] / this.data.alldetailValues.length,
        ];
        this.employeeFeeling = [
          this.sumOfAllData['easy'] / this.data.alldetailValues.length,
          this.sumOfAllData['engaged'] / this.data.alldetailValues.length,
          this.sumOfAllData['fun'] / this.data.alldetailValues.length,
          this.sumOfAllData['feeling_happy'] / this.data.alldetailValues.length,
          this.sumOfAllData['managable'] / this.data.alldetailValues.length,
          this.sumOfAllData['anger'] / this.data.alldetailValues.length,
          this.sumOfAllData['anxiety'] / this.data.alldetailValues.length,
          this.sumOfAllData['depression'] / this.data.alldetailValues.length,
          this.sumOfAllData['fear'] / this.data.alldetailValues.length,
          this.sumOfAllData['frustation'] / this.data.alldetailValues.length,
        ];
        this.oltj = [
          this.sumOfAllData['organization'] / this.data.alldetailValues.length,
          this.sumOfAllData['leadership'] / this.data.alldetailValues.length,
          this.sumOfAllData['team'] / this.data.alldetailValues.length,
          this.sumOfAllData['job'] / this.data.alldetailValues.length,
        ];
        this.loading = false;
      });
    } else {
      if (this.currentSelectedGraphName) {
        let item = this.graphValue[this.currentSelectedGraphName].find(
          (val: any) =>
            val[this.currentSelectedDbName] === this.currentSelectedId
        );
        this.loading = true;
        setTimeout(() => {
          let org_item = this.data.oltj_data.find(
            (val: any) => val.row_id === item['id']
          );
          this.sumOfAllData['no_of_employees'] = Number(
            item['no_of_employees']
          );
          this.sumOfAllData['no_of_responses'] = Number(
            item['no_of_responses']
          );
          this.sumOfAllData['veryhappy'] = item['veryhappy'];
          this.sumOfAllData['happy'] = item['happy'];
          this.sumOfAllData['neitherhappy'] = item['neitherhappy'];
          this.sumOfAllData['sad'] = item['sad'];
          this.sumOfAllData['verysad'] = item['verysad'];
          this.sumOfAllData['easy'] = item['easy'];
          this.sumOfAllData['engaged'] = item['engaged'];
          this.sumOfAllData['fun'] = item['fun'];
          this.sumOfAllData['managable'] = item['managable'];
          this.sumOfAllData['anger'] = item['anger'];
          this.sumOfAllData['anxiety'] = item['anxiety'];
          this.sumOfAllData['depression'] = item['depression'];
          this.sumOfAllData['fear'] = item['fear'];
          this.sumOfAllData['frustation'] = item['frustation'];
          this.sumOfAllData['feeling_happy'] = item['feelinghappy'];
          if (org_item) {
            this.sumOfAllData['organization'] = Number(
              org_item['organization_value']
            );
            this.sumOfAllData['leadership'] = Number(
              org_item['leadership_value']
            );
            this.sumOfAllData['team'] = Number(org_item['team_value']);
            this.sumOfAllData['job'] = Number(org_item['job_value']);
          } else {
            this.sumOfAllData['organization'] = 0;
            this.sumOfAllData['leadership'] = 0;
            this.sumOfAllData['team'] = 0;
            this.sumOfAllData['job'] = 0;
          }

          this.totNoOfEmp = Number(item['no_of_employees']);
          this.totNoOfRes = Number(item['no_of_responses']);
          this.totNoOfPer = Number(
            (Number(this.totNoOfRes) / Number(this.totNoOfEmp)) * 100
          ).toFixed(2);
          this.sumOfAllData['beats_quotient'] = item['beats_quotient'];
          this.wellBeingQuet = Number(item['well_being_quotient']).toFixed(2);
          this.wellBeingTot = [];
          this.wellBeingTrade = [];
          this.wellBeing.forEach((val: any) => {
            Number(this.wellBeingTot.push(Number(item[val.value]).toFixed(2)));
          });
          this.wellBeing.forEach((val: any) => {
            Number(
              this.wellBeingTrade.push(
                item[val.tactive] == 1 ? Number(item[val.trade]).toFixed(2) : 0
              )
            );
          });
          this.employeeMood = [
            this.sumOfAllData['veryhappy'],
            this.sumOfAllData['happy'],
            this.sumOfAllData['neitherhappy'],
            this.sumOfAllData['sad'],
            this.sumOfAllData['verysad'],
          ];
          this.employeeFeeling = [
            this.sumOfAllData['easy'],
            this.sumOfAllData['engaged'],
            this.sumOfAllData['fun'],
            this.sumOfAllData['feeling_happy'],
            this.sumOfAllData['managable'],
            this.sumOfAllData['anger'],
            this.sumOfAllData['anxiety'],
            this.sumOfAllData['depression'],
            this.sumOfAllData['fear'],
            this.sumOfAllData['frustation'],
          ];
          this.oltj = [
            this.sumOfAllData['organization'],
            this.sumOfAllData['leadership'],
            this.sumOfAllData['team'],
            this.sumOfAllData['job'],
          ];
          this.loading = false;
        });
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
