import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as Quill from 'quill';

@Directive({
  selector: '[appTextEditor]'
})
export class TextEditorDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    const quill = new Quill(this.element.nativeElement, {
      theme: 'snow'
    });
  }

}
