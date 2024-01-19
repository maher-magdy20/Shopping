import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritCommponentComponent } from './favourit-commponent.component';

describe('FavouritCommponentComponent', () => {
  let component: FavouritCommponentComponent;
  let fixture: ComponentFixture<FavouritCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritCommponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
