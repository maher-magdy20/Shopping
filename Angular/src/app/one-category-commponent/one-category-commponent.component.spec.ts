import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCategoryCommponentComponent } from './one-category-commponent.component';

describe('OneCategoryCommponentComponent', () => {
  let component: OneCategoryCommponentComponent;
  let fixture: ComponentFixture<OneCategoryCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCategoryCommponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCategoryCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
