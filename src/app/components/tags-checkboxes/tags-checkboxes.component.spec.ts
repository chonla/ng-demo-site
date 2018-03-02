import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCheckboxesComponent } from './tags-checkboxes.component';

describe('TagsCheckboxesComponent', () => {
  let component: TagsCheckboxesComponent;
  let fixture: ComponentFixture<TagsCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
