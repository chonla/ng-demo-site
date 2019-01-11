import { Directive, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appResource]'
})
export class ResourceDirective implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('appResource') resource: string;
  @Output() dataEmitter: EventEmitter<any>;
  private dataObservable: Observable<object>;
  private dataSubscription$: Subscription;

  constructor(private http: HttpClient) {
    this.dataEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.dataObservable = this.http.get(this.resource)
      .map(res => res);
    this.dataSubscription$ = this.dataObservable.subscribe(res => {
      this.dataEmitter.emit(res);
    });
  }

  ngOnDestroy() {
    this.dataSubscription$.unsubscribe();
  }

}
