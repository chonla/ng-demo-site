import { Component, OnInit, ViewChild, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {
  @ViewChild('alertBox') alertBox;
  @Output() public shown: boolean;

  public title;
  public message;

  constructor() {
    this.shown = false;
  }

  ngOnInit() {
  }

  show(title, message) {
    this.title = title;
    this.message = message;
    this.shown = true;
  }

  hide() {
    this.shown = false;
  }

}
