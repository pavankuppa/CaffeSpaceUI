import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountOffersComponent } from './discount-offers.component';

describe('DiscountItemsComponent', () => {
  let component: DiscountOffersComponent;
  let fixture: ComponentFixture<DiscountOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
