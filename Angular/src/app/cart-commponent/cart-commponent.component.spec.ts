import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCommponentComponent } from './cart-commponent.component';

describe('CartCommponentComponent', () => {
  let component: CartCommponentComponent;
  let fixture: ComponentFixture<CartCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCommponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
