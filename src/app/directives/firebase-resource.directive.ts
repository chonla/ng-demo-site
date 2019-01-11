import { Directive, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription ,  Observable } from 'rxjs';

@Directive({
  selector: '[appFirebaseResource]'
})
export class FirebaseResourceDirective implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('appFirebaseResource') resource: string;
  @Output() dataEmitter: EventEmitter<any>;
  private dataSubscription$: Subscription;
  private dataObservable: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.dataEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.dataObservable = this.db.collection(this.resource).valueChanges()
      .map(res => res);
    this.dataSubscription$ = this.dataObservable.subscribe(res => {
      this.dataEmitter.emit(res);
    });
  }

  ngOnDestroy() {
    this.dataSubscription$.unsubscribe();
  }

}
