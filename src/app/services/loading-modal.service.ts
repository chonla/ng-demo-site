import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoadingModalComponent } from '../components/loading-modal/loading-modal.component';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingModalService {

  private modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  show(message): Observable<any> {
    const loadingModalOptions = {
      initialState: {
        message: message
      },
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };

    var modalObservable = Observable.create(observer => {
      this.modalService.onShown.subscribe(_ => {
        observer.next(true);
        observer.complete();
      });
      this.modalRef = this.modalService.show(LoadingModalComponent, loadingModalOptions);
    });
    return modalObservable;
  }

  hide() {
    this.modalRef.hide();
  }

}
