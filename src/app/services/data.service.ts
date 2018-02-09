import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DataService {

  constructor(private db: AngularFirestore) { }

  async save(to, obj) {
    const col = this.db.collection(to);
    await col.add(obj);
  }

}
