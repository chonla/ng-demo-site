import { Directive, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appResource]'
})
export class ResourceDirective implements OnInit, OnDestroy {

  @Input('appResource') resource: string;
  @Output() dataEmitter: EventEmitter<any>;
  private dataSubscription$;

  constructor(private http: HttpClient) {
    this.dataEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.dataSubscription$ = this.http.get(this.resource);
    this.dataSubscription$.subscribe(o => {
      this.dataEmitter.emit(o);
    });
  }

  ngOnDestroy() {
    this.dataSubscription$.unsubscribe();
  }

}
