import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';

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

  private add(to, obj): Observable<void> {
    const docId = this.db.createId();
    const col = this.db.collection(to);
    obj['id'] = docId;
    return from(col.doc(docId).set(obj));
  }

  private update(to, key, obj): Observable<void> {
    const col = this.db.collection(to);
    return from(col.doc(key).set(obj));
  }

  public get(from, key?): Observable<any> {
    if (key) {
      const doc = this.db.collection(from).doc(key);
      return doc.valueChanges();
    }
    return this.db.collection(from).valueChanges();
  }

  public remove(from, key): Observable<void> {
    const col = this.db.collection(from);
    return from(col.doc(key).delete());
  }

}
