import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame3Component } from './frame3.component';

describe('Frame3Component', () => {
  let component: Frame3Component;
  let fixture: ComponentFixture<Frame3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Frame3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Frame3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
