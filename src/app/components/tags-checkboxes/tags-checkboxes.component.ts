import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tags-checkboxes',
  templateUrl: './tags-checkboxes.component.html',
  styleUrls: ['./tags-checkboxes.component.css']
})
export class TagsCheckboxesComponent implements OnInit, OnChanges {

  @Input() tagsData;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tagsData'].currentValue) {
      console.log(changes);
      // this.updateForm();
    }
  }


}
