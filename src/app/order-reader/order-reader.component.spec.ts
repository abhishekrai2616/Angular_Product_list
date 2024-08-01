import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReaderComponent } from './order-reader.component';

describe('OrderReaderComponent', () => {
  let component: OrderReaderComponent;
  let fixture: ComponentFixture<OrderReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
