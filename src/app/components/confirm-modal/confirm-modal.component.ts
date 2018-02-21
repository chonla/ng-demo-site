import { Component, TemplateRef, ViewChild, Input, EventEmitter } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @ViewChild('confirmModal') confirmModal: TemplateRef<any>;
  @Input('message') message;
  public modalRef: BsModalRef;
  private dataEmitter: EventEmitter<boolean>;

  constructor(private modalService: BsModalService) {
    this.dataEmitter = new EventEmitter<boolean>();
  }

  show(): EventEmitter<boolean> {
    const options: ModalOptions = {
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(this.confirmModal, options);
    return this.dataEmitter;
  }

  confirm() {
    this.modalRef.hide();
    this.dataEmitter.emit(true);
  }

  decline() {
    this.modalRef.hide();
    this.dataEmitter.emit(false);
  }
}
