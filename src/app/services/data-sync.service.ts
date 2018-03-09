import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';

@Injectable()
export class DataSyncService {

  constructor(
    private data: DataService
  ) { }

  sync(containerCollectionName, containerIds, contentName, contentId): Observable<any> {
    var syncObservable = Observable.create(observer => {
      var container$ = this.data.get(containerCollectionName).subscribe(containers => {
        container$.unsubscribe();
        var saveObservableList = [];
        containers.forEach(container => {
          if (container[contentName] && (container[contentName].indexOf(contentId) !== -1) && (containerIds.indexOf(container.id) === -1)) {
            // remove content from container
            container[contentName].splice(container[contentName].indexOf(contentId), 1);
            this.data.save(containerCollectionName, container).subscribe(_ => {
            });
          } else {
            if (((!container[contentName]) || (container[contentName].indexOf(contentId) === -1)) && (containerIds.indexOf(container.id) !== -1)) {
              if (!container.hasOwnProperty(contentName)) {
                container[contentName] = [];
              }
              // add content to container
              container[contentName].push(contentId);
              saveObservableList.push(this.data.save(containerCollectionName, container));
            }
          }
        });
        if (saveObservableList.length > 0) {
          Observable.forkJoin(saveObservableList)
            .subscribe(_ => {
              observer.next(true);
              observer.complete();
            });
        } else {
          observer.next(true);
          observer.complete();
        }
      });
    });

    return syncObservable;

  }

}
