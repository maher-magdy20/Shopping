import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommponentComponent } from './home-commponent.component';

describe('HomeCommponentComponent', () => {
  let component: HomeCommponentComponent;
  let fixture: ComponentFixture<HomeCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCommponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
