import { Component, TemplateRef, ViewChild, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.component.html',
  styleUrls: ['./create-login.component.css']
})
export class CreateLoginComponent {
  @ViewChild('createLoginModal') createLoginModal: TemplateRef<any>;
  @ViewChild('loadingModal') loadingModal: LoadingModalComponent;
  @ViewChild('errorModal') error: ErrorAlertComponent;
  public modalRef: BsModalRef;
  private dataEmitter: EventEmitter<boolean>;
  public registerForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private auth: AuthService,
    public bsModalRef: BsModalRef
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

  confirm() {
    const formModel = this.registerForm.value;

    if (formModel.username === '') {
      this.error.show('สร้างล็อกอินไม่สำเร็จ', 'โปรดระบุอีเมลเพื่อใช้ในการล็อกอิน');
      this.dataEmitter.emit(false);
      return;
    }

    if (formModel.password !== formModel.confirmedPassword) {
      this.error.show('สร้างล็อกอินไม่สำเร็จ', 'รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านที่ระบุ');
      this.dataEmitter.emit(false);
      return;
    }

    if (formModel.password.length < 6) {
      this.error.show('สร้างล็อกอินไม่สำเร็จ', 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัว');
      this.dataEmitter.emit(false);
      return;
    }

    const loadingModalOptions = {
      initialState: {
        message: 'กำลังสร้างล็อกอิน'
      },
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };
    var loadingModalRef = this.modalService.show(LoadingModalComponent, loadingModalOptions);
    this.auth.create(formModel)
      .then(_ => {
        loadingModalRef.hide();
        this.bsModalRef.hide();
        this.dataEmitter.emit(true);
      })
      .catch(e => {
        loadingModalRef.hide();
        this.error.show('สร้างล็อกอินไม่สำเร็จ', e.code);
      });
  }

  decline() {
    this.bsModalRef.hide();
    this.dataEmitter.emit(false);
  }
}
