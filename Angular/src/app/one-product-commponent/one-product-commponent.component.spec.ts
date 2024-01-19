import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProductCommponentComponent } from './one-product-commponent.component';

describe('OneProductCommponentComponent', () => {
  let component: OneProductCommponentComponent;
  let fixture: ComponentFixture<OneProductCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneProductCommponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneProductCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
