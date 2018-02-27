import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCheckboxesComponent } from './categories-checkboxes.component';

describe('CategoriesCheckboxesComponent', () => {
  let component: CategoriesCheckboxesComponent;
  let fixture: ComponentFixture<CategoriesCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
