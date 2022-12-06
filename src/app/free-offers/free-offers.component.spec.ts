import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeOffersComponent } from './free-offers.component';

describe('FreeItemsComponent', () => {
  let component: FreeOffersComponent;
  let fixture: ComponentFixture<FreeOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
