import { Component, TemplateRef, ViewChild, Input, EventEmitter, AfterViewInit, Query } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';

@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.component.html',
  styleUrls: ['./create-login.component.css']
})
export class CreateLoginComponent implements AfterViewInit {
  @ViewChild('createLoginModal') createLoginModal: TemplateRef<any>;
  @ViewChild('loadingModal') loadingModal: LoadingModalComponent;
  @ViewChild('errorModal') error: ErrorAlertComponent;
  public modalRef: BsModalRef;
  private dataEmitter: EventEmitter<boolean>;
  public registerForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.dataEmitter = new EventEmitter<boolean>();
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: '',
      password: '',
      confirmedPassword: ''
    });
  }

  ngAfterViewInit() {
    console.log(this.error);
  }

  show(): EventEmitter<boolean> {
    const options: ModalOptions = {
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true
    };
    this.modalRef = this.modalService.show(this.createLoginModal, options);
    return this.dataEmitter;
  }

  confirm() {
    const formModel = this.registerForm.value;

    if (formModel.password !== formModel.confirmedPassword) {
      this.dataEmitter.emit(false);
      return;
    }

    if (formModel.password == '') {
      this.dataEmitter.emit(false);
      return;
    }

    this.loadingModal.show();
    this.auth.create(formModel)
      .then(_ => {
        this.modalRef.hide();
        this.dataEmitter.emit(true);
        this.loadingModal.hide();
      })
      .catch(e => {
        this.loadingModal.hide();
        this.error.show('สร้างล็อกอินไม่สำเร็จ', e.code);
      });
  }

  decline() {
    this.modalRef.hide();
    this.dataEmitter.emit(false);
  }
}
