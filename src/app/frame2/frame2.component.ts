import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame2',
  templateUrl: './frame2.component.html',
  styleUrls: ['./frame2.component.css']
})
export class Frame2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logo = 'assets/images/beats-logo.png'
  imageSrc = 'assets/images/beats.gif' 
}
