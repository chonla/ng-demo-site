import { Component, OnInit, Input } from '@angular/core';
import { ResourceDirective } from '../../directives/resource.directive';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {

  @Input() galleryData;

  constructor() { }

  ngOnInit() {
  }

}
