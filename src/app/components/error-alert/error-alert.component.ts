import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css'],
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
export class ErrorAlertComponent implements OnInit {

  public title;
  public message;
  public showed = false;

  constructor() { }

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

  ngOnInit() {
  }

}
