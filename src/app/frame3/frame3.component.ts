import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame3',
  templateUrl: './frame3.component.html',
  styleUrls: ['./frame3.component.css']
})
export class Frame3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logo = 'assets/images/beats-logo.png'
  imageSrc = 'assets/images/beats.gif' 
}
