import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughchartComponent } from './doughchart.component';

describe('DoughchartComponent', () => {
  let component: DoughchartComponent;
  let fixture: ComponentFixture<DoughchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoughchartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
