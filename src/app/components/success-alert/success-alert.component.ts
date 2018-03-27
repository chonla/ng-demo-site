import { Component, OnInit, ViewChild, Output } from '@angular/core';
import * as $ from 'jquery';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css'],
  animations: [
    trigger(
      'fadeAnimated', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('100ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('100ms', style({ opacity: 0 }))
        ])
      ]
    )
  ]
})
export class SuccessAlertComponent implements OnInit {
  @Output() public showed: boolean;

  public title;
  public message;

  constructor() {
    this.showed = false;
  }

  ngOnInit() {
  }

  show(title, message) {
    this.title = title;
    this.message = message;
    this.showed = true;
  }

  hide() {
    this.showed = false;
  }

  closeModal() {
    this.hide();
  }
}
