import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-frame1',
  templateUrl: './frame1.component.html',
  styleUrls: ['./frame1.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class Frame1Component implements OnInit {

  constructor() { }
  logo = 'assets/images/beats-logo.png'
  ngOnInit(): void {
  }

}
