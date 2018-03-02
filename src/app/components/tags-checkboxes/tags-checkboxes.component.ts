import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tags-checkboxes',
  templateUrl: './tags-checkboxes.component.html',
  styleUrls: ['./tags-checkboxes.component.css']
})
export class TagsCheckboxesComponent implements OnInit, OnChanges {

  @Input() tagsData;
  public tagForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tagsData'].currentValue) {
      this.updateForm();
    }
  }

  updateForm() {
    var tagCheckboxes = new Array(this.tagsData.length).fill(false);
    this.tagForm = this.fb.group({
      tag: this.fb.array(tagCheckboxes)
    });
  }

  initializeForm() {
    this.tagForm = this.fb.group({
      tag: this.fb.array([])
    });
  }

  removeTag(index) {
    this.tagsData.splice(index, 1);
  }
}
