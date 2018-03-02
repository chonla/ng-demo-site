import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAdderComponent } from './tags-adder.component';

describe('TagsAdderComponent', () => {
  let component: TagsAdderComponent;
  let fixture: ComponentFixture<TagsAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
