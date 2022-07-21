import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-frame1',
  templateUrl: './frame1.component.html',
  // styleUrls: ['./frame1.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class Frame1Component implements OnInit { 
  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    items: 7,
    loop: false,
    // mouseDrag: true,
    // touchDrag: true,
    // pullDrag: true,
    dots: false,
    // autoWidth: true,
    nav: false
  }
  logo = 'assets/images/beats-logo.png'
  imageSrc = 'assets/images/beats.gif' 
}
