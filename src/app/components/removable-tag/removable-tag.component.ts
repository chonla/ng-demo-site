import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-removable-tag',
  templateUrl: './removable-tag.component.html',
  styleUrls: ['./removable-tag.component.css']
})
export class RemovableTagComponent implements OnInit {

  @Input() tag;
  public hidden: boolean;

  constructor() {
    this.hidden = false;
  }

  ngOnInit() {
  }

  removeTag() {
    this.hidden = true;
  }
}
