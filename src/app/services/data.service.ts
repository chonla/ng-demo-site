import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private db: AngularFirestore) { }

  save(to, obj): Observable<any> {
    if (!obj.hasOwnProperty('created_timestamp') || obj['created_timestamp'] === '') {
      obj['created_timestamp'] = (new Date()).toISOString();
    }
    obj['updated_timestamp'] = (new Date()).toISOString();

    if (!obj.hasOwnProperty('id') || obj['id'] === '') {
      return this.add(to, obj);
    }
    return this.update(to, obj.id, obj);
  }

  private add(to, obj): Observable<{}> {
    const col = this.db.collection(to);
    return Observable.fromPromise(col.add(obj));
  }

  private update(to, key, obj): Observable<{}> {
    const doc = this.db.doc(to + '/' + key);
    const item = doc.valueChanges();
    doc.update(obj);
    return item;
  }

}
