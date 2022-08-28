import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-frame3',
  templateUrl: './frame3.component.html',
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class Frame3Component implements OnInit {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  @ViewChild('childInsightModal', { static: false })
  childInsightModal?: ModalDirective;
  @ViewChild('childActionModal', { static: false })
  childActionModal?: ModalDirective;
  @ViewChild('openTextModal', { static: false }) openTextModal?: ModalDirective;
  data: any;
  loading: boolean = true;
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
  employeeFeeling: any = [];
  employeeMood: any = [];
  wordCloudData: string = '';
  category: any = [];
  opentextvalues: any = [];
  selectedOpentext: number = 0;
  openVal: any = [];
  overviewResponse: any = [];
  dropDownList: any = [];

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
      db_name: 'sex_id',
      name: 'Sexual Orientation',
      responseName: 'sexdetails',
      topValues: 'sex_graph',
      findName: 'sex',
    },
    {
      db_name: 'work_location_id',
      name: 'Work Location',
      responseName: 'locations',
      topValues: 'location_graph',
      findName: 'worklocation',
    },
    {
      db_name: 'language_id',
      name: 'Languages',
      responseName: 'languages',
      topValues: 'location_graph',
      findName: 'language',
    },
    {
      db_name: 'association_id',
      name: 'Association',
      responseName: 'associations',
      topValues: 'association_graph',
      findName: 'association',
    },

    {
      db_name: 'ownership_id',
      name: 'ownership',
      responseName: 'ownerships',
      topValues: 'ownership_graph',
      findName: 'ownership',
    },

    {
      db_name: 'organization_type_id',
      name: 'organization type',
      responseName: 'organization_types',
      topValues: 'organization_type_graph',
      findName: 'organization_type',
    },

    {
      db_name: 'organization_size_id',
      name: 'organization sizes',
      responseName: 'organization_sizes',
      topValues: 'organization_size_graph',
      findName: 'organization_size',
    },
    {
      db_name: 'industry_sector_id',
      name: 'industry sector',
      responseName: 'industry_sectors',
      topValues: 'industry_sectors_graph',
      findName: 'industry',
    },
    {
      db_name: 'grade_id',
      name: 'Grade In Company',
      responseName: 'grades',
      topValues: 'grades_sectors_graph',
      findName: 'grade',
    },
    {
      db_name: 'ethinicity_id',
      name: 'ethinicity',
      responseName: 'ethinicitys',
      topValues: 'ethinicity_graph',
      findName: 'ethinicity',
    },
    {
      db_name: 'education_id',
      name: 'education',
      responseName: 'educations',
      topValues: 'education_graph',
      findName: 'education',
    },
    {
      db_name: 'employment_status_id',
      name: 'employment status',
      responseName: 'employment_status_details',
      topValues: 'employment_status_graph',
      findName: 'employment_status',
    },
  ];
  wellBeing = [
    {
      name: 'Sustaining Change',
      value: 'sustainingchange_value',
      desc: 'sustainingchange_title',
    },
    {
      name: 'Delivering Change',
      value: 'deliverychange_value',
      desc: 'deliverychange_title',
    },
    {
      name: 'Accountability & Power of Influence',
      value: 'accountability_value',
      desc: 'accountability_title',
    },
    {
      name: 'Ownership',
      value: 'ownership_value',
      desc: 'ownership_title',
    },
  ];
  sumOfAllData: any = {
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
  };

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

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
            this.filterBy.forEach((value: any) => {
              let key = value.responseName;
              this.graphValue[key] = this.data.alldetailValues.filter(
                (filterValue: any) => {
                  return filterValue[value.db_name] !== null;
                }
              );
            });

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
              this.opentextvalues[this.selectedOpentext].word_cloud;
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

  showChildModal(i: any, forModal = ''): void {
    if (forModal === 'openText') this.openTextModal?.show();
  }

  hideChildModal(forModal = '', clickedText = -1): void {
    if (forModal === 'openText') {
      this.openTextModal?.hide();
      if (clickedText > -1) this.selectedOpentext = clickedText;
      this.loading = true;
      setTimeout(() => {
        this.openVal = this.opentextvalues[this.selectedOpentext].word_cloud;
        this.loading = false;
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
  }

  calculateAllValues() {
    if (this.currentEnabled === '') {
      this.loading = true;
      setTimeout(() => {
        this.initializeValue();
        this.data.alldetailValues.forEach((item: any) => {
          this.sumOfAllData['no_of_employees'] =
            Number(this.sumOfAllData['no_of_employees']) +
            Number(item['no_of_employees']);
          this.sumOfAllData['no_of_responses'] =
            Number(this.sumOfAllData['no_of_responses']) +
            Number(item['no_of_responses']);
        });
        this.totNoOfEmp = this.sumOfAllData['no_of_employees'];
        this.totNoOfRes = this.sumOfAllData['no_of_responses'];
        this.totNoOfPer = Number(
          (this.totNoOfRes / this.totNoOfEmp) * 100
        ).toFixed(2);
        this.wellBeingQuet = Number(
          this.data.alldetailValues
            .map((item: any) => item.well_being_quotient)
            .reduce((prev: any, curr: any) => Number(prev) + Number(curr), 0) /
            this.data.alldetailValues.length
        ).toFixed(2);
        this.wellBeing.forEach((val: any) => {
          this.wellBeingTot.push(
            Number(
              this.data.alldetailValues
                .map((item: any) => item[val.value])
                .reduce(
                  (prev: any, curr: any) => Number(prev) + Number(curr),
                  0
                ) / this.data.alldetailValues.length
            ).toFixed(2)
          );
        });
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
          this.sumOfAllData['no_of_employees'] = Number(
            item['no_of_employees']
          );
          this.sumOfAllData['no_of_responses'] = Number(
            item['no_of_responses']
          );
          this.totNoOfEmp = Number(item['no_of_employees']);
          this.totNoOfRes = Number(item['no_of_responses']);
          this.totNoOfPer = Number(
            (this.totNoOfRes / this.totNoOfEmp) * 100
          ).toFixed(2);
          this.wellBeingQuet = Number(item['well_being_quotient']).toFixed(2);
          this.wellBeing.forEach((val: any) => {
            Number(this.wellBeingTot.push(Number(item[val.value]).toFixed(2)));
          });
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
