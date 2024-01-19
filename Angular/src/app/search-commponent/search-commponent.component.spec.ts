import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCommponentComponent } from './search-commponent.component';

describe('SearchCommponentComponent', () => {
  let component: SearchCommponentComponent;
  let fixture: ComponentFixture<SearchCommponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCommponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCommponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
