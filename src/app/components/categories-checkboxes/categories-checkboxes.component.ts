import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-categories-checkboxes',
  templateUrl: './categories-checkboxes.component.html',
  styleUrls: ['./categories-checkboxes.component.css']
})
export class CategoriesCheckboxesComponent implements OnInit, OnChanges {

  @Input() categoriesData;
  public categoryForm: FormGroup;
  public selections: string[];

  constructor(
    private fb: FormBuilder
  ) {
    this.selections = [];
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoriesData'].currentValue) {
      this.updateForm();
    }
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      category: this.fb.array([])
    });
  }

  updateForm() {
    var categoryCheckboxes = new Array(this.categoriesData.length).fill(false);
    this.categoryForm = this.fb.group({
      category: this.fb.array(categoryCheckboxes)
    });
  }

  getSelections() {
    return this.selections;
  }

  updateSelections(index, $event) {
    this.selections = this.categoryForm.controls.category.value.map((o, i) => {
      return {
        'value': this.categoriesData[i].id,
        'selected': o
      };
    }).filter(o => o.selected).map(o => o.value);
  }

  setSelections(values: string[]) {
    this.selections = values;

    const checks = [];
    this.categoriesData.forEach((o, i) => {
      checks[i] = this.isSelected(o.id);
    });

    this.categoryForm = this.fb.group({
      category: this.fb.array(checks)
    });
  }

  isSelected(value) {
    return (this.selections.indexOf(value) >= 0);
  }
}
