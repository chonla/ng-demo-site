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
    this.applySelections();
  }

  getSelections() {
    return this.selections;
  }

  updateSelections($event) {
    if ($event.target.checked) {
      this.selections.push($event.target.value);
    } else {
      this.selections.splice(this.selections.indexOf($event.target.value), 1);
    }
  }

  setSelections(values: string[]) {
    this.selections = values;
    this.applySelections();
  }

  applySelections() {
    if (!this.categoriesData) {
      return;
    }

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
