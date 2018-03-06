import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent implements OnInit {

  @ViewChild('loadingModal') loadingModal: TemplateRef<any>;
  @Input('message') message;
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  show() {
    const options: ModalOptions = {
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };
    this.modalRef = this.modalService.show(this.loadingModal, options);
  }

  hide() {
    this.modalRef.hide();
  }

}
