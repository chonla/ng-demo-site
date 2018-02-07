import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  public galleryData;

  constructor() { }

  ngOnInit() {
  }

  dataReceiver($event) {
    this.galleryData = $event.data;
  }

}
