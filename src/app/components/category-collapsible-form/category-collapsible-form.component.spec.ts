import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCollapsibleFormComponent } from './category-collapsible-form.component';

describe('CategoryCollapsibleFormComponent', () => {
  let component: CategoryCollapsibleFormComponent;
  let fixture: ComponentFixture<CategoryCollapsibleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCollapsibleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCollapsibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
