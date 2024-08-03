import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOrderSummary } from './product-choose.component';

describe('OrderSummaryComponent', () => {
  let component: AppOrderSummary;
  let fixture: ComponentFixture<AppOrderSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppOrderSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOrderSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
